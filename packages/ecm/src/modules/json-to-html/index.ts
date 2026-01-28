import { ECM } from '../../core'
import { query } from '../../_utils'
import { Parser } from './parser'
import { Renderer } from './renderer'

export const ECM_MODULE_NAME = 'ecm-json-to-html'

export class JSONToHTML {
  root: HTMLElement
  controlled: Boolean = false
  outputTemplate: HTMLTemplateElement
  templates: HTMLTemplateElement[]
  data: any
  ecm?: ECM

  constructor(root: HTMLElement, ecm?: ECM) {
    this.root = root
    this.ecm = ecm
    this.controlled = root.getAttribute('data-controlled') === 'true'

    if (!this.controlled) {
      const dataTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-output-data')[0]
      if (!dataTemplate) {
        throw new Error('[ECM] [JSONTOHTML] [data-template-data] not found.')
      }

      const parser = new Parser()
      const isHtml = dataTemplate.getAttribute('data-type') === 'html'
      if (isHtml) {
        const wrapper = this.renderTemplateChildrenToDiv(dataTemplate)
        this.data = parser.parse(wrapper)
      } else {
        this.data = parser.parseString(dataTemplate.innerHTML)
      }

      this.loadTemplates()
      this.render()
      return
    }

    this.addEvents()
  }

  private addEvents() {
    this.root.addEventListener('ecmJsonToHtmlSetData', (e) => {
      const data = (e as CustomEvent).detail

      if (typeof data !== 'object') {
        throw new Error('[ECM] [JSONTOHTMl] Data must be an Object.')
      }

      this.data = data
    })

    this.root.addEventListener('ecmJsonToHtmlLoadTemplates', () => {
      this.loadTemplates()
    })

    this.root.addEventListener('ecmJsonToHtmlRender', () => {
      this.render()
    })
  }

  private loadTemplates() {
    this.outputTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-output')[0]
    this.templates = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-template')
  }

  private render() {
    const renderer = new Renderer(this.templates, 'discard')
    const rendered = renderer.render(this.outputTemplate, this.data, '')

this.root.innerHTML = rendered + this.root.innerHTML
    if (this.ecm) {
      this.ecm.init({
        root: this.root,
        mount: false,
      })
    }
  }

  private renderTemplateChildrenToDiv(template: HTMLTemplateElement) {
    const wrapper = document.createElement('div')
    for (let child of [...template.content.children]) {
      wrapper.appendChild(child)
    }

    return wrapper
  }
}
