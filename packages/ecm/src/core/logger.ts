declare global {
  interface Window {
    _console?: {
      enableConsole?: () => void
    }
  }
}

export class Logger {
  enabled: boolean = false

  constructor() {
    const urlParams = new URLSearchParams(window.location.search)
    this.enabled = urlParams.get('ecm_enable_log') === 'true'

    if (!this.enabled) {
      return
    }

    try {
      if (window?._console?.enableConsole && typeof window?._console?.enableConsole === 'function') {
        window._console.enableConsole()
      }
    } catch (e) {
      console.error(e)
    }
  }

  log(...args: any) {
    if (!this.enabled) {
      return
    }

    console.log(...args)
  }
}
