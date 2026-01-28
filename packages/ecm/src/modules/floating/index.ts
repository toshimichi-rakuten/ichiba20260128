import { query } from '../../_utils'
import { ECM } from '../../core'
import { BodyLock } from '../body-lock'
export const ECM_MODULE_NAME = 'ecm-floating'

export class Floating {
  root: HTMLElement
  showThreshold: number
  showAt: HTMLElement
  ignoreBodyLockScrollEvent: boolean
  bodyLock: BodyLock
  _hidden: boolean
  _closed: boolean
  _static: boolean

  constructor(root: HTMLElement, _ecm?: ECM) {
    this.root = root
    this.static = root.getAttribute('data-static') === 'true'
    this.ignoreBodyLockScrollEvent = root.getAttribute('data-ignore-body-lock-scroll-event') === 'true'
    this.bodyLock = BodyLock.singleton()

    this.setupThreshold()
    this.setupCloseButton()
  }

  get closed() {
    return this._closed
  }

  set closed(newValue) {
    this._closed = newValue
    this.hidden = newValue
  }

  get hidden() {
    return this._hidden
  }

  set hidden(newValue) {
    this._hidden = newValue
    this.root.setAttribute('aria-hidden', newValue.toString())
  }

  get static() {
    return this._static
  }

  set static(newValue) {
    this._static = newValue
    this.root.setAttribute('data-static', newValue.toString())
  }

  private setupThreshold() {
    const showAtSelector = this.root.getAttribute('data-show-at')

    if (showAtSelector) {
      const showAt = document.querySelector<HTMLElement>(showAtSelector)

      if (!showAt) {
        throw new Error(`[Floating] Element with selector "${showAtSelector}" not found.`)
      }

      this.showAt = showAt
    } else {
      this.showThreshold = this.root.getAttribute('data-show-threshold')
        ? Number(this.root.getAttribute('data-show-threshold'))
        : 0
    }

    if (this.showAt) {
      this.hidden = this.showAt.offsetTop === 0 ? false : this.root.getAttribute('aria-hidden') === 'true'
    } else {
      this.hidden = this.showThreshold === 0 ? false : this.root.getAttribute('aria-hidden') === 'true'
    }

    if (this.static || (!this.showAt && !this.showThreshold)) {
      return
    }

    window.addEventListener(
      'scroll',
      () => {
        if (this.ignoreBodyLockScrollEvent && this.bodyLock.locked) {
          return
        }

        if (this.closed) {
          return
        }

        if (this.showAt) {
          this.hidden = window.scrollY <= this.showAt.offsetTop
        } else {
          this.hidden = window.scrollY <= this.showThreshold
        }
      },
      { passive: true }
    )
  }

  private setupCloseButton() {
    const closeButtons = query<HTMLButtonElement>(this.root).getElementsByAttribute({
      'aria-controls': this.root.getAttribute('id'),
    })

    if (!closeButtons.length) {
      return
    }

    for (let button of closeButtons) {
      button.addEventListener('click', () => {
        this.closed = true
      })
    }
  }
}
