import smoothscroll from 'smoothscroll-polyfill'
import { DUJSLoader, isMobileDevice } from './du-js-loader'
import { Logger } from './logger'
import { Session } from './session'
import { query, toBoolean } from '../_utils'
import {
  ECM_MODULE_NAME_ATTRIBUTE,
  ECM_INITIALIZED_ATTRIBUTE,
  ECM_DYNAMIC_CONTENT_CHILD_ATTRIBUTE,
  ECM_SKIP_INIT_ATTRIBUTE,
  ECM_DYNAMIC_CONTENT_NAME,
  ECM_INITIALIZE_EVENT_NAME,
  ECM_INITIALIZE_BLOCK_EVENT_NAME,
} from './constants'
import { ECM_MODULE_NAME as AlcorName, Alcor } from '../modules/alcor/'
import { ECM_MODULE_NAME as SearchAlcorItemName, SearchAlcorItem } from '../modules/alcor-search/'
import { ECM_MODULE_NAME as ScrollToTopName, ScrollToTop } from '../modules/scroll-to-top/'
import { ECM_MODULE_NAME as FloatingName, Floating } from '../modules/floating/'
import { ECM_MODULE_NAME as FloatingNaviName, FloatingNavi } from '../modules/floating-navi/'
import { ECM_MODULE_NAME as ToggleName, Toggle } from '../modules/toggle/'
import { ECM_MODULE_NAME as SmoothScrollName, SmoothScroll } from '../modules/smooth-scroll/'
import { ECM_MODULE_NAME as TabName, Tab } from '../modules/tab/'
import { ECM_MODULE_NAME as HoverName, Hover } from '../modules/hover/'
import { ECM_MODULE_NAME as RoomRecommendName, RoomRecommend } from '../modules/room-recommend/'
import { ECM_MODULE_NAME as CouponShopListName, CouponShopList } from '../modules/coupon-shop-list/'
import { ECM_MODULE_NAME as AccordionName, Accordion } from '../modules/accordion/'
import { ECM_MODULE_NAME as ViewMoreName, ViewMore } from '../modules/view-more/'
import { ECM_MODULE_NAME as SliderName, Slider } from '../modules/slider/'
import { ECM_MODULE_NAME as AutoParameterName, AutoParameter } from '../modules/auto-parameter/'
import { ECM_MODULE_NAME as JSONToHTMLName, JSONToHTML } from '../modules/json-to-html'
import { ECM_MODULE_SELECTOR as LazyImageSelector, LazyImageObserver } from '../modules/lazy-image'

export type InitParams = {
  root: HTMLElement | Document
  mount: boolean
}

export type InitEventParams = {
  target: HTMLElement
}

export type ModuleName =
  | typeof AlcorName
  | typeof SearchAlcorItemName
  | typeof ScrollToTopName
  | typeof FloatingName
  | typeof FloatingNaviName
  | typeof ToggleName
  | typeof SmoothScrollName
  | typeof TabName
  | typeof HoverName
  | typeof RoomRecommendName
  | typeof CouponShopListName
  | typeof AccordionName
  | typeof ViewMoreName
  | typeof SliderName
  | typeof AutoParameterName
  | typeof JSONToHTMLName

export type Module =
  | typeof Alcor
  | typeof SearchAlcorItem
  | typeof ScrollToTop
  | typeof Floating
  | typeof FloatingNavi
  | typeof Toggle
  | typeof SmoothScroll
  | typeof Tab
  | typeof Hover
  | typeof RoomRecommend
  | typeof CouponShopList
  | typeof Accordion
  | typeof ViewMore
  | typeof Slider
  | typeof AutoParameter
  | typeof JSONToHTML

export function getTargetImages({ root, mount }: InitParams) {
  return query<HTMLImageElement>(root)
    .getElements(LazyImageSelector)
    .filter((el) => !toBoolean(el.getAttribute(ECM_INITIALIZED_ATTRIBUTE)))
    .filter((el) => {
      const shouldSkipInit = toBoolean(el.getAttribute(ECM_SKIP_INIT_ATTRIBUTE))

      if (mount && shouldSkipInit) {
        return false
      }

      return true
    })
}

export function getTargetModules({ root, mount }: InitParams) {
  const elements = query<HTMLElement>(root)
    .getElementsByAttribute(ECM_MODULE_NAME_ATTRIBUTE)
    .filter((el) => !toBoolean(el.getAttribute(ECM_INITIALIZED_ATTRIBUTE)))
    .filter((el) => {
      const shouldSkipInit = toBoolean(el.getAttribute(ECM_SKIP_INIT_ATTRIBUTE))

      if (mount && shouldSkipInit) {
        return false
      }

      return true
    })

  const oldAuto = [
    // @ts-ignore
    ...document.querySelectorAll(
      '.js-auto-parameter:not(.rp-autoParameter--initialized), .rp-autoParameter:not(.rp-autoParameter--initialized)'
    ),
  ]
    .filter((el) => !toBoolean(el.getAttribute(ECM_INITIALIZED_ATTRIBUTE)))
    .filter((el) => {
      const shouldSkipInit = toBoolean(el.getAttribute(ECM_SKIP_INIT_ATTRIBUTE))

      if (mount && shouldSkipInit) {
        return false
      }

      return true
    }) as HTMLElement[]

  return [...elements, ...oldAuto]
}

const MODULES = new Map<ModuleName, Module>()
MODULES.set(JSONToHTMLName, JSONToHTML)
MODULES.set(AlcorName, Alcor)
MODULES.set(SearchAlcorItemName, SearchAlcorItem)
MODULES.set(ScrollToTopName, ScrollToTop)
MODULES.set(FloatingName, Floating)
MODULES.set(FloatingNaviName, FloatingNavi)
MODULES.set(ToggleName, Toggle)
MODULES.set(SmoothScrollName, SmoothScroll)
MODULES.set(TabName, Tab)
MODULES.set(HoverName, Hover)
MODULES.set(RoomRecommendName, RoomRecommend)
MODULES.set(CouponShopListName, CouponShopList)
MODULES.set(AccordionName, Accordion)
MODULES.set(ViewMoreName, ViewMore)
MODULES.set(SliderName, Slider)
MODULES.set(AutoParameterName, AutoParameter)

function initTargetMap() {
  const map = new Map<ModuleName, HTMLElement[]>()
  map.set(JSONToHTMLName, [])
  map.set(AlcorName, [])
  map.set(SearchAlcorItemName, [])
  map.set(ScrollToTopName, [])
  map.set(FloatingName, [])
  map.set(FloatingNaviName, [])
  map.set(ToggleName, [])
  map.set(SmoothScrollName, [])
  map.set(TabName, [])
  map.set(HoverName, [])
  map.set(RoomRecommendName, [])
  map.set(CouponShopListName, [])
  map.set(AccordionName, [])
  map.set(ViewMoreName, [])
  map.set(SliderName, [])
  map.set(AutoParameterName, [])

  return map
}

export class ECM {
  lazyImageObserver: LazyImageObserver
  logger: Logger
  session: Session

  constructor() {
    this.logger = new Logger()
    this.session = new Session()
    this.initPolyfills()
    this.setupDynamicChild()
    this.lazyImageObserver = new LazyImageObserver()

    this.init({
      root: document,
      mount: true,
    })

    this.initDynamicContent()
    this.initInitializeListener()
    DUJSLoader((script) => {
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      const viewportMetaContent = viewportMeta?.getAttribute('content')

      this.logger.log('[ECM Log] DU JS SP: ', isMobileDevice())
      this.logger.log('[ECM Log] DU JS Viewport: ', viewportMetaContent)
      this.logger.log(`[ECM Log] DU JS Loaded. `, script)
    })
  }

  init(params: InitParams) {
    this.observeLazyImages(params)

    const targets = getTargetModules(params)
    const map = initTargetMap()

    this.logger.log(`[ECM Log] Targets`, targets)

    for (let target of targets) {
      // backwards compat
      if (target.classList.contains('js-auto-parameter') || target.classList.contains('rp-autoParameter')) {
        map.set(AutoParameterName, [...(map.get(AutoParameterName) as []), target])
        continue
      }

      const targetModule = target.getAttribute(ECM_MODULE_NAME_ATTRIBUTE) as ModuleName

      // TODO: bypass this if data-module-name=ecm-dynamic-content
      if (!map.has(targetModule)) {
        // console.warn(`[ECM] module with the name "${targetModule}" does not exists.`)
        continue
      }

      map.set(targetModule, [...(map.get(targetModule) as []), target])
    }

    for (let [key, targets] of map.entries()) {
      targets.forEach((t) => this.initModule(key, t))
    }
  }

  private initModule(key: ModuleName, target: HTMLElement) {
    this.logger.log(`[ECM Log] Init: ${key}`, target)

    // backwards compat
    if (target.classList.contains('js-auto-parameter') || target.classList.contains('rp-autoParameter')) {
      target.setAttribute(ECM_INITIALIZED_ATTRIBUTE, 'true')
      target.classList.add('rp-autoParameter--initialized')

      try {
        new AutoParameter(target, this)
        this.logger.log(`[ECM Log] Success: ${key}`, target)
      } catch (err) {
        console.error(err)
      }

      return
    }

    if (!MODULES.has(key)) {
      console.error(`[ECM] Cannot init module with the name "${key}" because it does not exists.`)
      return
    }

    const module = MODULES.get(key) as Module
    target.setAttribute(ECM_INITIALIZED_ATTRIBUTE, 'true')

    try {
      new module(target, this)
      this.logger.log(`[ECM Log] Success: ${key}`, target)
    } catch (err) {
      console.error(err)
    }
  }

  private initInitializeListener(): void {
    document.addEventListener(ECM_INITIALIZE_EVENT_NAME, (e: Event) => {
      const detail = (<CustomEvent<InitEventParams>>e).detail
      const target = detail.target

      this.logger.log(`[ECM Log] Initialize event called.`, target)

      if (!target) {
        console.error('[ECM] target node is required.')
      }

      const targetModule = target.getAttribute(ECM_MODULE_NAME_ATTRIBUTE) as ModuleName
      this.initModule(targetModule, target)

      this.observeLazyImages({
        root: target,
        mount: false,
      })
    })

    document.addEventListener(ECM_INITIALIZE_BLOCK_EVENT_NAME, (e: Event) => {
      const detail = (<CustomEvent<InitEventParams>>e).detail
      const target = detail.target

      this.logger.log(`[ECM Log] Initialize block event called.`)

      this.init({
        root: target,
        mount: false,
      })

      this.observeLazyImages({
        root: target,
        mount: false,
      })
    })
  }

  private observeLazyImages(params: InitParams) {
    const lazyImages = getTargetImages(params)

    for (let image of lazyImages) {
      image.setAttribute(ECM_INITIALIZED_ATTRIBUTE, 'true')
      this.lazyImageObserver.add(image)
    }
  }

  private initDynamicContent(): void {
    const createCallback = (root: HTMLElement) => (mutationList: MutationRecord[]) => {
      for (let mutation of mutationList) {
        if (mutation.type === 'childList') {
          this.logger.log(`[ECM Log] [Dynamic Content] Mutation Detected`, root)

          this.init({
            root,
            mount: false,
          })
        }
      }
    }

    const dynamic = query<HTMLElement>(document)
      .getElementsByAttribute({
        [ECM_MODULE_NAME_ATTRIBUTE]: ECM_DYNAMIC_CONTENT_NAME,
      })
      .filter((d) => d.getAttribute(ECM_INITIALIZED_ATTRIBUTE) !== 'true')

    for (let el of dynamic) {
      const callback = createCallback(el)
      const mutation = new MutationObserver(callback)
      mutation.observe(el, { childList: true, subtree: true })
      el.setAttribute(ECM_INITIALIZED_ATTRIBUTE, 'true')
    }
  }

  private setupDynamicChild(): void {
    const dynamics = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_DYNAMIC_CONTENT_NAME,
    })

    this.logger.log(`[ECM Log] Setup dynamic-content`, dynamics)

    for (let dynamic of dynamics) {
      const skipInit = dynamic.getAttribute(ECM_SKIP_INIT_ATTRIBUTE) || 'true'

      const children = query<HTMLElement>(dynamic).getElementsByAttribute(ECM_MODULE_NAME_ATTRIBUTE)

      this.logger.log(`[ECM Log] Setup dynamic-content children`, children)

      for (let child of children) {
        const moduleName = child.getAttribute(ECM_MODULE_NAME_ATTRIBUTE) as ModuleName

        // TODO: bypass this if data-module-name=ecm-dynamic-content
        if (!MODULES.has(moduleName)) {
          // console.error(`[ECM] "${moduleName}" module does not exists.`)
          continue
        }

        child.setAttribute(ECM_DYNAMIC_CONTENT_CHILD_ATTRIBUTE, 'true')
        child.setAttribute(ECM_SKIP_INIT_ATTRIBUTE, skipInit)
      }
    }
  }

  private initPolyfills(): void {
    // iOS14 Safari does not have support for the smooth scroll behavior.
    smoothscroll.polyfill()
  }
}

// Supported viewport size.
export type ViewportSize = 'sp' | 'md' | 'lg'

export function getCurrentViewport(): ViewportSize {
  if (window.innerWidth >= 1024) return 'lg'
  if (window.innerWidth >= 768) return 'md'
  return 'sp'
}
