import { query, toBoolean } from '../../_utils'
import { ECM } from '../../core'
import { BodyLock } from '../body-lock'

export const ECM_MODULE_NAME = 'ecm-search-alcor-item'
const DEFAULT_TRANSITION_MS = 280

export class SearchAlcorItem {
  root: HTMLElement
  popupTrigger: HTMLElement
  popupBg: HTMLElement
  popupMenu: HTMLElement
  _open: boolean = false
  _opening: boolean
  _closing: boolean
  transition: boolean
  transitionMs: number
  bodyLock?: BodyLock

  boundedFocusKeyDown?: (event: KeyboardEvent) => void
  boundedEscapeKeyDown?: (event: KeyboardEvent) => void

  // 2024/06/07
  // For backwards compatibility, we support the old attributes without "data-" prefix.
  // ecm-search-alcor-popup-trigger -> data-ecm-search-alcor-popup-trigger
  // ecm-search-alcor-popup-bg -> data-ecm-search-alcor-popup-bg
  // ecm-search-alcor-popup-menu -> data-ecm-search-alcor-popup-menu
  // as of this writing, only test pages should be using the old attributes.

  constructor(root: HTMLElement, _ecm?: ECM) {
    this.root = root
    this.popupTrigger =
      query<HTMLButtonElement>(this.root).getElementsByAttribute('data-ecm-search-alcor-popup-trigger')[0] ||
      query<HTMLButtonElement>(this.root).getElementsByAttribute('data-ecm-search-alcor-v2-popup-trigger')[0] ||
      query<HTMLButtonElement>(this.root).getElementsByAttribute('ecm-search-alcor-popup-trigger')[0]
    if (!this.popupTrigger) {
      throw new Error('[Search Alcor] [data-ecm-search-alcor-popup-trigger] not found.')
    }

    this.popupBg =
      query<HTMLDivElement>(this.root).getElementsByAttribute('data-ecm-search-alcor-popup-bg')[0] ||
      query<HTMLDivElement>(this.root).getElementsByAttribute('data-ecm-search-alcor-v2-popup-bg')[0] ||
      query<HTMLDivElement>(this.root).getElementsByAttribute('ecm-search-alcor-popup-bg')[0]
    if (!this.popupBg) {
      throw new Error('[Search Alcor] [data-ecm-search-alcor-popup-bg] not found.')
    }

    this.popupMenu =
      query<HTMLDivElement>(this.root).getElementsByAttribute('data-ecm-search-alcor-popup-menu')[0] ||
      query<HTMLDivElement>(this.root).getElementsByAttribute('data-ecm-search-alcor-v2-popup-menu')[0] ||
      query<HTMLDivElement>(this.root).getElementsByAttribute('ecm-search-alcor-popup-menu')[0]
    if (!this.popupMenu) {
      throw new Error('[Search Alcor] [data-ecm-search-alcor-popup-menu] not found.')
    }

    this._setFocusTrap()
    this._setCloseOnEscape()
    this._setupTransition()
    this._setupBodyLock()

    this.popupTrigger.addEventListener('click', (_event) => {
      this.open = !this.open
    })

    // For correctness, technically not needed since the container could handle this.
    this.popupBg.addEventListener('click', (event) => {
      event.stopPropagation()
      this.open = false
    })
  }

  _setupTransition() {
    this.transition = toBoolean(this.root.getAttribute('data-transition'))
    this.transitionMs = Number(this.root.getAttribute('data-transition-ms')) || DEFAULT_TRANSITION_MS
  }

  _setFocusTrap() {
    if (this.popupTrigger) {
      this.boundedFocusKeyDown = this.focusHandler.bind(this)
    }
  }

  _setCloseOnEscape() {
    if (this.popupTrigger) {
      this.boundedEscapeKeyDown = this.escapeHandler.bind(this)
    }
  }

  _setupBodyLock() {
    this.bodyLock = BodyLock.singleton()
  }

  private focusHandler(event: KeyboardEvent) {
    // just to be sure
    if (!this.open) {
      return
    }

    const focusables = Array.from(this.popupMenu.querySelectorAll<HTMLElement>('a')).filter(
      (el) => !(el.hasAttribute('disabled') || el.hasAttribute('aria-disabled'))
    )

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
    } else if (!this.popupMenu.contains(document.activeElement)) {
      nextEl = event.shiftKey ? last : first
    }

    if (nextEl && event.key === 'Tab') {
      nextEl.focus()
      event.preventDefault()
    }
  }

  private escapeHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.open = false
    }
  }

  get open() {
    return this._open
  }

  get opening() {
    return this._opening
  }

  set opening(newValue) {
    this._opening = newValue
    this.popupMenu.setAttribute('data-opening', newValue.toString())
    this.popupBg.setAttribute('data-opening', newValue.toString())
  }

  get closing() {
    return this._closing
  }

  set closing(newValue) {
    this._closing = newValue
    this.popupMenu.setAttribute('data-closing', newValue.toString())
    this.popupBg.setAttribute('data-closing', newValue.toString())
  }

  set open(nextValue) {
    this._open = nextValue

    if (this.transition) {
      // Busy
      if (this.opening || this.closing) {
        return
      }

      this.opening = nextValue
      this.closing = !nextValue
    }

    const toggle = () => {
      if (this.bodyLock) {
        this.bodyLock.set(nextValue)
      }

      if (this.transition) {
        this.opening = false
        this.closing = false
      }

      if (nextValue) {
        this.popupMenu.setAttribute('data-visible', 'true')
        this.popupBg.setAttribute('data-visible', 'true')
      } else {
        this.popupMenu.setAttribute('data-visible', 'false')
        this.popupBg.setAttribute('data-visible', 'false')
      }

      if (nextValue && this.boundedFocusKeyDown) {
        document.addEventListener('keydown', this.boundedFocusKeyDown)
      }

      if (!nextValue && this.boundedFocusKeyDown) {
        document.removeEventListener('keydown', this.boundedFocusKeyDown)
      }

      if (nextValue && this.boundedEscapeKeyDown) {
        document.addEventListener('keydown', this.boundedEscapeKeyDown)
      }

      if (!nextValue && this.boundedEscapeKeyDown) {
        document.removeEventListener('keydown', this.boundedEscapeKeyDown)
      }
    }

    this.transition ? setTimeout(toggle, this.transitionMs) : toggle()
  }
}
