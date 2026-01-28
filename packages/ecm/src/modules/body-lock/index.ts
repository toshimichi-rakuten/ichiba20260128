export class BodyLock {
  private static instance: BodyLock

  originalStyle: {
    overflowX: string
    overflowY: string
    position: string
    width: string
    top: string
  }

  scrollTop: number
  locked: boolean

  constructor() {
    this.locked = false
    this.scrollTop = document.documentElement.scrollTop

    this.originalStyle = {
      overflowX: document.body.style.overflowX,
      overflowY: document.body.style.overflowY,
      position: document.body.style.position,
      width: document.body.style.width,
      top: document.body.style.top,
    }

    this._setEvents()
  }

  _setEvents() {
    const body = document.querySelector('body')

    if (!body) {
      console.warn('[ECM] [BodyLock] body tag not detected on page. Event listeners will not be set.')
      return
    }

    body.addEventListener('ecmBodyLockLock', () => {
      this.set(true)
    })

    body.addEventListener('ecmBodyLockUnlock', () => {
      this.set(false)
    })

    body.addEventListener('ecmBodyLockToggle', () => {
      this.set(!this.locked)
    })
  }

  set(state: boolean) {
    if (state) {
      this.lock()
    } else {
      this.unlock()
    }
  }

  lock() {
    // ICW-20679
    // Browser returns 0 on the initial scrollTop position when the page is loaded (from another page) with #hash on the URL.
    // This is probably a race condition bug with BodyLock constructor or a weird browser bug.
    // Due to behavior, the initial render will not work properly and will cause the issue in the ticket.
    // Ideally we want to tick the render function initially to sync the state of dom with the JS but it's not possible.
    // Since by default the "locked" state is false, an easy fix is to skip the initial render by removing unnecessary rerender.
    if (this.locked) {
      return
    }

    this.locked = true
    this.scrollTop = document.documentElement.scrollTop

    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'scroll'
    document.body.style.position = 'fixed'
    const compStyles = window.getComputedStyle(document.body)
    // Handles edge cases where body has padding.
    if (compStyles.getPropertyValue('box-sizing') === 'border-box') {
      document.body.style.width = '100%'
    } else {
      const paddingLeft = compStyles.getPropertyValue('padding-left')
      const paddingRight = compStyles.getPropertyValue('padding-right')

      document.body.style.width = `calc(100% - ${paddingLeft} - ${paddingRight})`
    }
    document.body.style.top = `-${this.scrollTop}px`
  }

  unlock() {
    // ICW-20679: Do not rerender if not needed.
    if (!this.locked) {
      return
    }

    this.locked = false
    document.body.style.overflowX = this.originalStyle.overflowX
    document.body.style.overflowY = this.originalStyle.overflowY
    document.body.style.position = this.originalStyle.position
    document.body.style.width = this.originalStyle.width
    document.body.style.top = this.originalStyle.top

    document.documentElement.scrollTop = this.scrollTop
  }

  static singleton(): BodyLock {
    if (!BodyLock.instance) {
      BodyLock.instance = new BodyLock()
    }

    return BodyLock.instance
  }
}
