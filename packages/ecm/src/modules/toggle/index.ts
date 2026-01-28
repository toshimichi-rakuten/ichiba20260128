import { query, toBoolean } from '../../_utils'
import { ECM } from '../../core'
import { BodyLock } from '../body-lock'

export const ECM_MODULE_NAME = 'ecm-toggle'
const DEFAULT_TRANSITION_MS = 280

export class Toggle {
  root: HTMLElement
  triggers: HTMLElement[]
  transition: boolean
  transitionMs: number
  bodyLock?: BodyLock

  _opening: boolean
  _closing: boolean
  _isOpen: boolean

  boundedFocusKeyDown?: (event: KeyboardEvent) => void
  boundedEscapeKeyDown?: (event: KeyboardEvent) => void

  constructor(root: HTMLElement, _ecm?: ECM) {
    this.root = root

    this.triggers = query<HTMLElement>(document).getElementsByAttribute({
      'aria-controls': this.root.getAttribute('id'),
    })

    this._setupTransition()
    this._setupTrigger()
    this._setupBodyLock()
    this._setFocusTrap()
    this._setCloseOnEscape()
    this._setEvents()

    // Set default state
    this.isOpen = this.root.getAttribute('data-default-open') === 'true'
  }

  _setEvents() {
    this.root.addEventListener('ecmToggleOpen', () => {
      this.isOpen = true
    })

    this.root.addEventListener('ecmToggleClose', () => {
      this.isOpen = false
    })

    this.root.addEventListener('ecmToggleToggle', () => {
      this.isOpen = !this.isOpen
    })
  }

  _setFocusTrap() {
    const trapFocus = this.root.getAttribute('aria-modal') === 'true'
    if (trapFocus) {
      this.boundedFocusKeyDown = this.focusHandler.bind(this)
    }
  }

  _setCloseOnEscape() {
    const closeOnEscape = this.root.getAttribute('aria-modal') === 'true'
    if (closeOnEscape) {
      this.boundedEscapeKeyDown = this.escapeHandler.bind(this)
    }
  }

  private escapeHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.isOpen = false
    }
  }

  private focusHandler(event: KeyboardEvent) {
    // just to be sure
    if (!this.isOpen) {
      return
    }

    const focusables = Array.from(
      this.root.querySelectorAll<HTMLElement>(
        'a, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      )
    ).filter((el) => !(el.hasAttribute('disabled') || el.hasAttribute('aria-disabled')))

    if (event.key === 'Tab' && !focusables.length) {
      event.preventDefault()
      return
    }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    let nextEl

    if (document.activeElement === first) {
      nextEl = event.shiftKey ? last : null
    } else if (document.activeElement === last) {
      nextEl = event.shiftKey ? null : first
    } else if (!this.root.contains(document.activeElement)) {
      nextEl = event.shiftKey ? last : first
    }

    if (nextEl && event.key === 'Tab') {
      nextEl.focus()
      event.preventDefault()
    }
  }

  get isOpen() {
    return this._isOpen
  }

  set isOpen(newValue) {
    if (this.transition) {
      // Busy
      if (this.opening || this.closing) {
        return
      }

      this.opening = newValue
      this.closing = !newValue
    }

    const toggle = () => {
      if (this.bodyLock) {
        this.bodyLock.set(newValue)
      }

      this._isOpen = newValue
      this.root.setAttribute('aria-hidden', (!newValue).toString())

      for (let trigger of this.triggers) {
        trigger.setAttribute('aria-expanded', newValue.toString())
      }

      if (this.transition) {
        this.opening = false
        this.closing = false
      }

      if (this.isOpen && this.boundedFocusKeyDown) {
        document.addEventListener('keydown', this.boundedFocusKeyDown)
      }

      if (!this.isOpen && this.boundedFocusKeyDown) {
        document.removeEventListener('keydown', this.boundedFocusKeyDown)
      }

      if (this.isOpen && this.boundedEscapeKeyDown) {
        document.addEventListener('keydown', this.boundedEscapeKeyDown)
      }

      if (!this.isOpen && this.boundedEscapeKeyDown) {
        document.removeEventListener('keydown', this.boundedEscapeKeyDown)
      }
    }

    this.transition ? setTimeout(toggle, this.transitionMs) : toggle()
  }

  get opening() {
    return this._opening
  }

  set opening(newValue) {
    this._opening = newValue
    this.root.setAttribute('data-opening', newValue.toString())

    for (let trigger of this.triggers) {
      trigger.setAttribute('data-opening', newValue.toString())
    }
  }

  get closing() {
    return this._closing
  }

  set closing(newValue) {
    this._closing = newValue

    this.root.setAttribute('data-closing', newValue.toString())

    for (let trigger of this.triggers) {
      trigger.setAttribute('data-closing', newValue.toString())
    }
  }

  _setupTrigger() {
    for (let trigger of this.triggers) {
      trigger.addEventListener('click', () => {
        const disabled = toBoolean(trigger.getAttribute('aria-disabled'))
        if (disabled) {
          return
        }

        this.isOpen = !this.isOpen
      })
    }
  }

  _setupBodyLock() {
    if (toBoolean(this.root.getAttribute('data-body-lock'))) {
      this.bodyLock = BodyLock.singleton()
    }
  }

  _setupTransition() {
    this.transition = toBoolean(this.root.getAttribute('data-transition'))
    this.transitionMs = Number(this.root.getAttribute('data-transition-ms')) || DEFAULT_TRANSITION_MS
  }
}
