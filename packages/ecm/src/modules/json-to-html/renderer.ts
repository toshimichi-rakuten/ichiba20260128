import sanitizeHtml, { DisallowedTagsModes } from 'sanitize-html'

export class Renderer {
  templates: HTMLTemplateElement[]
  unsafeMap: Map<string, Array<any>> = new Map()
  sanitizeType: DisallowedTagsModes

  constructor(templates: HTMLTemplateElement[], sanitizeType: DisallowedTagsModes) {
    this.templates = templates
    this.sanitizeType = sanitizeType

    // Create map on init for perf.
    for (let t of this.templates) {
      const key = t.getAttribute('data-template')
      if (!key) {
        throw new Error(`template should have a 'data-template' attribute`)
      }

      const parsed = this.parseUnsafeList(t)
      this.unsafeMap.set(key, parsed)
    }
  }

  render(template: HTMLTemplateElement, data: Object, keyPrefix: string): string {
    if (typeof data !== 'object') {
      throw new Error('Must be an Object')
    }

    let outputHtml = template.innerHTML
    const sanitizeAll = template.hasAttribute('data-sanitize-all')
    const unsafeList = this.getUnsafeList(template)

    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        const fullKey = keyPrefix.length ? [keyPrefix, key].join('.') : key
        const keyTemplate = this.templates.find((t) => {
          return t.getAttribute('data-template') === fullKey
        })

        if (keyTemplate) {
          const shouldLoop = keyTemplate.getAttribute('data-loop') === 'true'
          if (shouldLoop) {
            const rendered = value
              .map((v) => {
                return this.render(keyTemplate, v, fullKey)
              })
              .join('')

            outputHtml = outputHtml.replaceAll(`###${key}###`, rendered)
            continue
          }

          let rendered = keyTemplate.innerHTML
          const sanitizeAll = keyTemplate.hasAttribute('data-sanitize-all')

          for (let [index, el] of value.entries()) {
            // No support. if element is an object, it should be looped with `data-loop`
            if (typeof el === 'object') {
              const elString = JSON.stringify(el)

              const sanitized = sanitizeAll
                ? sanitizeHtml(elString, {
                  disallowedTagsMode: this.sanitizeType,
                })
                : elString

              rendered = rendered.replaceAll(`###$${index}###`, sanitized)
              continue
            }

            const sanitized = sanitizeAll
              ? sanitizeHtml(el, {
                disallowedTagsMode: this.sanitizeType,
              })
              : el

            rendered = rendered.replaceAll(`###$${index}###`, sanitized)
          }
          outputHtml = outputHtml.replaceAll(`###${key}###`, rendered)
        }

        continue
      }

      if (typeof value === 'object') {
        const fullKey = keyPrefix.length ? [keyPrefix, key].join('.') : key
        const template = this.templates.find((t) => {
          return t.getAttribute('data-template') === fullKey
        })

        if (template) {
          const rendered = this.render(template, value, fullKey)
          outputHtml = outputHtml.replaceAll(`###${key}###`, rendered)
        }

        continue
      }

      const sanitized = sanitizeAll
        ? sanitizeHtml(value, { disallowedTagsMode: this.sanitizeType })
        : this.sanitize(unsafeList, key, value)

      outputHtml = outputHtml.replaceAll(`###${key}###`, sanitized)
    }

    // Clean up. Remove all unused template tags.
    // Since we iterate on the data, there's gonna be unused template tags if it has no equivalent data.
    const matches = outputHtml.matchAll(/###(.*?)###/g) || []
    for (let match of matches) {
      outputHtml = outputHtml.replaceAll(match[0], '')
    }

    return outputHtml
  }

  private sanitize(unsafeList: any[], key: string, value: string): string {
    if (!unsafeList.includes(key)) {
      return value
    }

    return sanitizeHtml(value, {
      disallowedTagsMode: this.sanitizeType,
    })
  }

  private parseUnsafeList(t: HTMLTemplateElement): any[] {
    const unsafe = t.getAttribute('data-unsafe')
    if (!unsafe) {
      return []
    }

    try {
      return JSON.parse(unsafe)
    } catch (e) {
      throw new Error('`data-unsafe` must be an array of string.')
    }
  }

  private getUnsafeList(t: HTMLTemplateElement): any[] {
    if (t.hasAttribute('data-output')) {
      return this.parseUnsafeList(t)
    }

    const key = t.getAttribute('data-template')
    if (!key) {
      throw new Error(`template should have a 'data-template' attribute.`)
    }

    return this.unsafeMap.get(key) || []
  }
}
