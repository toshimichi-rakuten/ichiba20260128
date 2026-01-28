import { query, toBoolean, debounce } from '../../_utils'
import { ECM } from '../../core'
import { ECM_MODULE_NAME as SMOOTH_SCROLL_NAME } from '../smooth-scroll'

export const ECM_MODULE_NAME = 'ecm-floating-navi'

export class FloatingNavi {
  root: HTMLElement
  smoothScrolls: HTMLAnchorElement[]

  constructor(root: HTMLElement, _ecm?: ECM) {
    this.root = root

    this.setupSticky()

    this.smoothScrolls = query<HTMLAnchorElement>(this.root).getElementsByAttribute({
      'data-module-name': SMOOTH_SCROLL_NAME,
    })

    const callback = (mutations: MutationRecord[]) => {
      for (let mut of mutations) {
        if (mut.type === 'attributes') {
          const first = this.smoothScrolls.find((el) => toBoolean(el.getAttribute('data-in-viewport')))
          if (!first) {
            return
          }

          this.root.scrollLeft = first.offsetLeft
        }
      }
    }

    const observer = new MutationObserver(debounce(callback, 10))

    for (let scroll of this.smoothScrolls) {
      observer.observe(scroll, { attributes: true })
    }
  }

  private setupSticky() {
    // container is .ecm-floating-navi-container (Floating module)
    const container = this.root.parentElement

    if (!container) {
      return
    }

    if (toBoolean(container.getAttribute('data-static'))) {
      return
    }

    container.setAttribute('data-sticky', 'false')
    let containerOffsetTop = container.offsetTop

    const checkSticky = () => {
      const isSticky = window.scrollY > containerOffsetTop
      container.setAttribute('data-sticky', isSticky.toString())
      spaceHolder.style.display = isSticky ? 'block' : 'none'
    }

    const resizeObserver = new ResizeObserver(
      debounce(() => {
        // Run our side effect after browser paints to prevent infinite loop
        // Read more about "Observation Errors" here:
        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
        requestAnimationFrame(() => {
          // if it's stickied, the offsetTop will be 0 so
          // we revert it first to false to properly calculate offsetTop
          container.setAttribute('data-sticky', 'false')
          containerOffsetTop = container.offsetTop
          checkSticky()
        })
      }, 150)
    )

    resizeObserver.observe(document.body)

    // See: https://git.rakuten-it.com/projects/ICWDCDG/repos/sidekick/pull-requests/1343/overview
    // We use position: fixed; to implement position: sticky; to avoid cross browser issues.
    // This causes the element to have 0 height which causes the document content to move.
    // To work around that, we create a placeholder element
    // that takes the previous space when FloatingNavi is stickied.
    const spaceHolder = document.createElement('div')
    spaceHolder.style.display = 'none'
    spaceHolder.setAttribute('data-floating-navi-spacer', ' true')
    spaceHolder.style.height = `${container.offsetHeight}px`

    // @ts-ignore
    container.parentNode.insertBefore(spaceHolder, container.nextSibling)

    window.addEventListener(
      'scroll',
      () => {
        checkSticky()
      },
      {
        passive: true,
      }
    )

    window.addEventListener(
      'resize',
      debounce(() => {
        // revert it first to false to get the true offsetTop
        container.setAttribute('data-sticky', 'false')
        spaceHolder.style.height = `${container.offsetHeight}px`
        checkSticky()
      }, 150),
      {
        passive: true,
      }
    )
  }
}
