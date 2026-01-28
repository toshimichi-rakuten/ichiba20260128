export class Parser {
  parseString(jsonStr: string): Object {
    try {
      return JSON.parse(jsonStr)
    } catch (e) {
      throw new Error(`Cannot parse: ${e}`)
    }
  }

  parse(root: HTMLElement): Object {
    let data: { [key: string]: any } = {}

    for (let child of [...root.children]) {
      const key = child.getAttribute('data-key')
      if (key) {
        data[key] = this.parseElement(child as HTMLElement)
      }
    }

    return data
  }

  private parseArray(root: HTMLElement): any[] {
    let data: any[] = []

    for (let child of [...root.children]) {
      const el = this.parseElement(child as HTMLElement)
      data.push(el)
    }

    return data
  }

  private parseElement(element: HTMLElement): any {
    const dataType = element.getAttribute('data-type')

    if (dataType === 'array') {
      return this.parseArray(element)
    }

    if (dataType === 'object') {
      return this.parse(element)
    }

    return element.textContent?.trim()
  }
}
