import { query } from '../../_utils'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-smooth-scroll'

export class ScrollObserver {
  private static instance: ScrollObserver
  smoothScrolls: SmoothScroll[] = []

  constructor() {
    window.addEventListener('scroll', () => this.setActive(), { passive: true })
  }

  setActive() {
    for (let smoothScroll of this.smoothScrolls) {
      const offsetTop = smoothScroll.target.offsetTop - smoothScroll.targetDetectOffset
      const offsetHeight = smoothScroll.target.offsetHeight
      const scrollY = window.scrollY

      const passed = scrollY >= offsetTop
      const inside = scrollY < offsetTop + offsetHeight

      smoothScroll.active = passed && inside
    }
  }

  add(smoothScroll: SmoothScroll) {
    this.smoothScrolls = [...this.smoothScrolls, smoothScroll]
  }

  static singleton(): ScrollObserver {
    if (!ScrollObserver.instance) {
      ScrollObserver.instance = new ScrollObserver()
    }

    return ScrollObserver.instance
  }
}

export class SmoothScroll {
  root: HTMLElement
  targetDetectOffset: number = 0
  target: HTMLElement
  _active: boolean = false
  obs: ScrollObserver

  constructor(root: HTMLElement, _ecm?: ECM) {
    const target = query<HTMLElement>(document).getElements(root.getAttribute('href'))[0]

    if (!target) {
      throw new Error('[ECM SmoothScroll] target not found.')
    }

    this.root = root
    this.target = target

    this.setupClick()
    this.setupTargetOffset()

    this.obs = ScrollObserver.singleton()
    this.obs.add(this)
  }

  get active() {
    return this._active
  }

  set active(newValue) {
    this._active = newValue

    this.root.setAttribute('data-in-viewport', this.active.toString())
    this.target.setAttribute('data-in-viewport', this.active.toString())
  }

  private setupTargetOffset() {
    const detectTarget = () => {
      const detectOffsetConfig = this.target.getAttribute('data-detect-offset')

      // Sane default.
      if (detectOffsetConfig == 'auto') {
        this.targetDetectOffset = this.root.clientHeight * 2
        return
      }

      if (!detectOffsetConfig) {
        this.targetDetectOffset = 0
        return
      }

      const value = Number(detectOffsetConfig)

      if (isNaN(value)) {
        this.targetDetectOffset = 0
        return
      }

      this.targetDetectOffset = value
    }

    detectTarget()
    window.addEventListener('resize', detectTarget)
  }

  private setupClick() {
    this.root.addEventListener('click', (e) => {
      e.preventDefault()

      // `top` and `clickScrollOffsetValue` should always be recalculated on click
      // because the DOM can change via CSS/JS.

      let top = this.target.getBoundingClientRect().top || 0

      const clickScrollOffset = this.root.getAttribute('data-offset')
      let clickScrollOffsetValue = 0

      if (clickScrollOffset) {
        // Inverse the sign cause it's more intuitive that way.
        // self means offset smooth scroll's own height. Used for sticky smooth scrolls.
        clickScrollOffsetValue =
          clickScrollOffset == 'self' ? Number(this.root.clientHeight) * -1 : Number(clickScrollOffset) * -1
      }

      // `getBoundingClientRect` value changes according to the current scroll position.
      // To make it always relative to top of the viewport, we add window.scrollY.
      top = Number(top) + Number(window.scrollY) + Number(clickScrollOffsetValue)
      top = Math.ceil(top)

      scrollToCallback(top, () => {
        this.obs.setActive()
      })
    })
  }
}

function scrollToCallback(top: number, callback: () => void): void {
  window.scrollTo({
    top,
    behavior: 'smooth',
  })

  const roundedY = Math.floor(window.scrollY).toFixed()
  const roundedTop = Math.floor(top).toFixed()

  const promise = new Promise<void>((resolve) => {
    const check = () => {
      if (roundedY === roundedTop) {
        window.removeEventListener('scroll', check)
        resolve()
      } else {
        setTimeout(() => {
          window.removeEventListener('scroll', check)
          resolve()
        }, 200)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
  })

  promise.then(callback)
}
