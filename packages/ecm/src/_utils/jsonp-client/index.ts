export class JsonpClient {
  private readonly head: HTMLHeadElement
  private readonly timeout: number = 100000
  private jsonpId: number = 0

  constructor() {
    const head = document.querySelector('head')

    if (!head) {
      throw new Error('[JsonpClient] head is undefined.')
    }

    this.head = head
  }

  get<T>(url: string): Promise<T> {
    this.jsonpId += 1

    const callbackName = this.createCallbackName()
    const script = this.createScriptTag(url, callbackName)

    return new Promise<T>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        this.cleanUp(callbackName, script, timeoutId)
        reject('[JsonpClient] request timeout error.')
      }, this.timeout)

      script.addEventListener('error', (e) => {
        this.cleanUp(callbackName, script, timeoutId)
        reject(e)
      })

      // @ts-ignore
      window[callbackName] = (data: any) => {
        this.cleanUp(callbackName, script, timeoutId)
        resolve(data)
      }

      this.head.appendChild(script)
    })
  }

  private createScriptTag(url: string, callbackName: string): HTMLScriptElement {
    const joiner = url.includes('?') ? '&' : '?'
    const script = document.createElement('script')
    script.src = encodeURI(`${url}${joiner}callback=${callbackName}`)
    script.async = true

    return script
  }

  private createCallbackName() {
    return `cb_${Date.now()}_${this.jsonpId}`
  }

  private cleanUp(callbackName: string, script: HTMLScriptElement, timeoutId: number) {
    // @ts-ignore
    window[callbackName] = undefined
    window.clearTimeout(timeoutId)
    this.head.removeChild(script)
  }
}
