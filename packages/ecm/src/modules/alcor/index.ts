import { ALCOR_TYPE } from './tags'
import { query } from '../../_utils'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-alcor'

type AlcorType = keyof typeof ALCOR_TYPE

export class Alcor {
  root: HTMLElement
  outputTemplate: HTMLTemplateElement
  itemTemplate: HTMLTemplateElement
  dataTemplate: HTMLTemplateElement[]
  extraDataTemplate: HTMLTemplateElement[]
  tagType: AlcorType
  tags: any[]
  items: any[]
  extraData: any[]
  ecm?: ECM

  constructor(root: HTMLElement, ecm?: ECM) {
    this.ecm = ecm
    this.root = root
    this.outputTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-alcor-output')[0]

    if (!this.outputTemplate) {
      throw new Error('[Alcor] data-alcor-output not found.')
    }

    this.dataTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-alcor-data')
    if (!this.dataTemplate.length) {
      throw new Error('[Alcor] data-alcor-data not found.')
    }

    // Optional
    this.extraDataTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-alcor-extra-data') || []

    this.itemTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-alcor-item-template')[0]
    if (!this.itemTemplate) {
      throw new Error('[Alcor] data-alcor-item-template not found.')
    }

    const tagType = (this.root.getAttribute('data-alcor-type') || 'normal') as AlcorType
    const tags = ALCOR_TYPE[tagType]

    if (!tags.length) {
      throw new Error('[Alcor] Invalid data-alcor-type.')
    }

    this.tagType = tagType
    this.tags = tags

    // ICW-21842: Automatically add _ex parameter to reduce image size
    if (this.tagType === 'normal') {
      this.itemTemplate = addExFlagToTag(this.itemTemplate, '###image-url###')
    }

    if (this.tagType === 'ranking') {
      this.itemTemplate = addExFlagToTag(this.itemTemplate, '###imageurl###')
    }

    this.items = this.dataTemplateToJson()

    this.render()
  }

  private render() {
    const noEmptyJson = this.items.filter((json) => {
      const noExtra = {
        ...json,
        _extra: null,
      }

      const values = Object.values(noExtra)

      // If atleast one property is not empty, we show the item.
      return values.some((v) => !!v)
    })

    const renderedItems = noEmptyJson
      .map((item) => {
        let template = this.itemTemplate.innerHTML

        const matches = template.match(/###(.*?)###/g)

        const getExtraValue = (key: string) => {
          const realKey = key.replace('extra-', '')
          const extra = item['_extra']

          return extra ? extra[realKey] : ''
        }

        if (matches) {
          for (let match of matches) {
            const key = match.replace(/#/g, '')
            let value = key.startsWith('extra-') ? getExtraValue(key) : item[key]

            if (value == null || value == undefined) {
              value = ''
            }

            template = template.replaceAll(match, value)
          }
        }

        return template
      })
      .join('')

    this.root.innerHTML = this.outputTemplate.innerHTML + this.root.innerHTML

    const container = query<HTMLElement>(this.root).getElementsByAttribute('data-alcor-item-container')[0]

    container.innerHTML = renderedItems

    const singles = query<HTMLElement>(this.root).getElementsByAttribute('data-alcor-item')

    for (let single of singles) {
      const alcorIndex = Number(single.getAttribute('data-alcor-item'))

      if (isNaN(alcorIndex)) {
        throw new Error('[Alcor] data-alcor-item value should be a number.')
      }

      const property = single.getAttribute('data-key')
      const singleItem = this.items[alcorIndex - 1]

      if (property) {
        const propertyValue = singleItem[property] || ''
        single.innerHTML = propertyValue
      }
    }

    if (this.ecm) {
      this.ecm.init({
        root: this.root,
        mount: false,
      })
    }
  }

  private dataTemplateToJson() {
    const arrs = this.dataTemplate.map((template) => {
      const nodes = [...template.content.children].filter((node) => node.hasAttribute('data-alcor-item'))

      const dataId = template.getAttribute('data-alcor-data') || ''
      const extraTemplate = this.extraDataTemplate.find(
        (template) => template.getAttribute('data-alcor-extra-data') == dataId
      )
      const extra = this.parseExtraData(extraTemplate)

      return nodes.map((node) => {
        let json = {}

        const dataElements = [...node.children]

        for (let el of dataElements) {
          const key = el.getAttribute('data-key')

          if (!key) {
            throw new Error(`[Alcor] Item has no data-key.`)
          }

          if (!this.tags.includes(key)) {
            throw new Error(`[Alcor] Key "${key} does not exist on Alcor type ${this.tagType}."`)
          }

          // @ts-ignore
          json[key] = el.innerHTML.trim()
          // @ts-ignore
          json['_extra'] = extra
        }

        return json
      })
    })

    return arrs.flat()
  }

  private parseExtraData(extraTemplate?: HTMLTemplateElement) {
    if (!extraTemplate) {
      return {}
    }

    let json = {}

    const items = [...extraTemplate.content.children]

    for (let el of items) {
      const key = el.getAttribute('data-key')

      if (key) {
        // @ts-ignore
        json[key] = el.innerHTML.trim()
      } else {
        console.error('[Alcor] data-alcor-extra-data item has no data-key.')
      }
    }

    return json
  }
}

// https://confluence.rakuten-it.com/confluence/display/IMGDLVRY/Specification+of+Rakuten+Image+Converter#SpecificationofRakutenImageConverter-RequestParameters
export function addExFlagToTag(templ: HTMLTemplateElement, tag: string): HTMLTemplateElement {
  const clonedTemplate = templ.cloneNode(true) as HTMLTemplateElement

  const targetImages = [...clonedTemplate.content.querySelectorAll('img')].filter((i) => {
    return i.getAttribute('data-lazy-loading') === tag
  })

  for (let img of targetImages) {
    const srcAttr = img.getAttribute('src')
    const dataLazyLoadingAttr = img.getAttribute('data-lazy-loading')

    // Do not do anything if there is no URL in either src or data-lazy-loading
    if (!srcAttr || !dataLazyLoadingAttr) {
      continue
    }

    // Do not do anything if the search params in data-lazy-loading have query params
    const lazyUrlSplit = dataLazyLoadingAttr.split('?')
    if (lazyUrlSplit.length > 1) {
      continue
    }

    // Extract resize parameter from src
    const resizeMatch = srcAttr.match(/[?&]resize=([^&]+)/)
    const resizeParam = resizeMatch ? resizeMatch[1] : null

    // Do not do anything if resize parameter does not exists
    if (!resizeParam) {
      continue
    }

    // Extract host from src
    const hostMatch = srcAttr.match(/^https?:\/\/([^/]+)/)
    const host = hostMatch ? hostMatch[1] : null

    // Only add _ex parameter if the URL host is in the supported list
    const supported = host && ['tshop.r10s.jp', 'r.r10s.jp'].includes(host)
    if (!supported) {
      continue
    }

    img.setAttribute('data-lazy-loading', `${tag}?_ex=${resizeParam}`)
  }

  return clonedTemplate
}
