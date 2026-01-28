import { query, toBoolean } from '../../_utils'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-hover'
const DEFAULT_TRANSITION_MS = 280

export class Hover {
  root: HTMLElement
  triggers: HTMLElement[]
  transition: boolean
  transitionMs: number
  hovering: HTMLElement[] = []
  attach: boolean = false
  attachOffsetLeft: number = 0
  attachOffsetTop: number = 0

  _opening: boolean
  _closing: boolean
  _isOpen: boolean

  constructor(root: HTMLElement, _ecm?: ECM) {
    this.root = root

    this.triggers = query<HTMLElement>(document).getElementsByAttribute({
      'aria-controls': this.root.getAttribute('id'),
    })

    this._setupTransition()
    this._setupEvents()
    this._setDefaultState()
    this._calculatePosition()
    window.addEventListener('resize', () => {
      this._calculatePosition()
    }, {
      passive: true
    })
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
      this._isOpen = newValue
      this.root.setAttribute('aria-hidden', (!newValue).toString())

      for (let trigger of this.triggers) {
        trigger.setAttribute('aria-expanded', newValue.toString())
      }

      if (this.transition) {
        this.opening = false
        this.closing = false
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

  _calculatePosition() {
    this.attach = this.root.getAttribute('data-attach') === 'true'

    if (!this.attach || !this.triggers.length) {
      return
    }

    this.attachOffsetLeft = Number(this.root.getAttribute('data-attach-offset-top')) || 0

    this.attachOffsetTop = Number(this.root.getAttribute('data-attach-offset-left')) || 0

    const calculate = () => {
      // place the hover element to the bottom left of the trigger by default.
      this.root.style.top = `${this.triggers[0].offsetTop + this.triggers[0].offsetHeight + this.attachOffsetLeft}px`

      this.root.style.left = `${this.triggers[0].offsetLeft + this.attachOffsetTop}px`
    }

    calculate()
  }

  _setupEvents() {
    this._setupMouseOver(this.root)
    this._setupMouseOut(this.root)

    for (let trigger of this.triggers) {
      this._setupMouseOver(trigger)
      this._setupMouseOut(trigger)
    }
  }

  _setupMouseOver(el: HTMLElement) {
    el.addEventListener('mouseover', () => {
      const disabled = toBoolean(el.getAttribute('aria-disabled'))

      if (!disabled) {
        this._calculatePosition()
        this.isOpen = true
        this.hovering.push(el)
      }
    })
  }

  _setupMouseOut(el: HTMLElement) {
    el.addEventListener('mouseout', () => {
      const disabled = toBoolean(el.getAttribute('aria-disabled'))
      this.hovering = this.hovering.filter((el) => !el.isSameNode(el))

      if (!disabled && !this.hovering.length) {
        this.isOpen = false
      }
    })
  }

  _setupTransition() {
    this.transition = toBoolean(this.root.getAttribute('data-transition'))
    this.transitionMs = Number(this.root.getAttribute('data-transition-ms')) || DEFAULT_TRANSITION_MS
  }

  _setDefaultState() {
    this.root.setAttribute('aria-hidden', 'true')

    for (let trigger of this.triggers) {
      trigger.setAttribute('aria-expanded', 'false')
    }
  }
}
