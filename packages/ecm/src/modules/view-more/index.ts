import { debounce, query } from '../../_utils'
import { ECM } from '../../core'
import { ViewportSize, getCurrentViewport } from '../../core/constants'

export const ECM_MODULE_NAME = 'ecm-view-more'

class ViewMoreTrigger {
  root: HTMLElement
  viewMore: ViewMore

  _isExpanded: boolean
  controlType: 'open' | 'close'
  shouldScroll: boolean

  constructor(root: HTMLElement, viewMore: ViewMore) {
    this.root = root
    this.viewMore = viewMore

    this.controlType = this.root.getAttribute('data-control-type') === 'close' ? 'close' : 'open'

    this.root.addEventListener('click', () => {
      this.viewMore.isClickedOpen = this.controlType === 'open' ? true : false
      this.viewMore.render()

      this.shouldScroll = this.root.getAttribute('data-scroll-on-click') === 'true'

      if (this.shouldScroll) {
        this.scrollToParent()
      }

      if (this.viewMore.sessionKey) {
        window.sessionStorage.setItem(this.viewMore.sessionKey, 'true')
      }
    })
  }

  get isExpanded() {
    return this._isExpanded
  }

  set isExpanded(newValue) {
    this._isExpanded = newValue

    this.root.setAttribute('aria-hidden', newValue === (this.controlType === 'open') ? 'true' : 'false')
    this.root.setAttribute('aria-expanded', newValue.toString())
  }

  private scrollToParent() {
    /** Do not put this in `this`.
     * `top` should always be recalculate on click because the DOM can change on external JS.
     * */
    const top = this.viewMore.root.getBoundingClientRect().top

    window.scrollTo({
      /**
       * `getBoundingClientRect` value changes according to the current scroll position.
       * To make it always relative to top of the viewport, we add window.scrollY.
       */
      top: Number(top) + Number(window.scrollY),
      behavior: 'smooth',
    })
  }
}

export class ViewMore {
  root: HTMLElement
  triggers: ViewMoreTrigger[]
  children: HTMLElement[]

  sessionKey?: string

  // If the user opens the component, it should be open on all situations.
  isClickedOpen: boolean = false
  // visibility state when the user haven't open the component yet.
  isDefaultOpen: boolean
  visibleCount: number
  mdVisibleCount: number
  lgVisibleCount: number
  openIfNoHidden: boolean
  currentViewport: ViewportSize = getCurrentViewport()

  constructor(root: HTMLElement, ecm?: ECM) {
    this.root = root

    const session = this.root.getAttribute('data-session') !== 'false'
    if (session && ecm) {
      this.sessionKey = ecm.session.create(ECM_MODULE_NAME)
    }

    this.openIfNoHidden = this.root.getAttribute('data-open-if-no-hidden') === 'true'
    this.visibleCount = Number(this.root.getAttribute('data-visible') || 0)
    this.mdVisibleCount = Number(this.root.getAttribute('data-md-visible')) || this.visibleCount
    this.lgVisibleCount = Number(this.root.getAttribute('data-lg-visible')) || this.mdVisibleCount
    this.children = Array.from(this.root.children) as HTMLElement[]

    const triggers = query<HTMLElement>(document).getElementsByAttribute({
      'aria-controls': this.root.getAttribute('id'),
    })

    if (!triggers.length) {
      throw new Error(`[ECM View More] trigger for '${this.root.getAttribute('id')}' not found.`)
    }

    this.triggers = triggers.map((t) => new ViewMoreTrigger(t, this))

    if (this.sessionKey) {
      const openFromStart = window.sessionStorage.getItem(this.sessionKey) === 'true'
      this.isDefaultOpen = openFromStart
    } else {
      this.isDefaultOpen = false
    }

    if (this.openIfNoHidden && this.children.length <= this.activeViewportCount) {
      this.isDefaultOpen = true
    }

    // Initial render
    this.render()

    window.addEventListener(
      'resize',
      debounce(() => {
        this.currentViewport = getCurrentViewport()
        this.isDefaultOpen = this.openIfNoHidden && this.children.length <= this.activeViewportCount
        this.render()
      }, 200)
    )
  }

  get activeViewportCount() {
    if (this.currentViewport === 'lg') {
      return this.lgVisibleCount
    } else if (this.currentViewport === 'md') {
      return this.mdVisibleCount
    }
    return this.visibleCount
  }

  render() {
    const openState = this.isDefaultOpen || this.isClickedOpen

    for (let trigger of this.triggers) {
      trigger.isExpanded = openState
    }

    if (openState) {
      for (let child of this.children) {
        child.setAttribute('aria-hidden', 'false')
      }
      return
    }

    for (let [index, child] of this.children.entries()) {
      const isHidden = index + 1 > this.activeViewportCount
      child.setAttribute('aria-hidden', isHidden.toString())
    }
  }
}
