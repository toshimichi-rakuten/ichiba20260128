import { query, toBoolean } from '../../_utils'

import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-slider'

const sliderClass = 'ecm-slider'
const slideNextClass = 'ecm-slider-next'
const slidePrevClass = 'ecm-slider-prev'

const navigationDisabledClass = 'ecm-slider-nav-disabled'
const navigationHiddenClass = 'ecm-slider-nav-hidden'

const paginationClass = 'ecm-slider-pagination'
const paginationBulletActiveClass = 'ecm-slider-pagination-bullet-active'
const paginationBulletClass = 'ecm-slider-pagination-bullet'
const paginationClickableClass = 'ecm-slider-pagination-clickable'
const paginationCurrentClass = 'ecm-slider-pagination-current'
const paginationHiddenClass = 'ecm-slider-pagination-hidden'
const paginationHorizontalClass = 'ecm-slider-pagination-horizontal'
const paginationLockClass = 'ecm-slider-pagination-lock'
const paginationModifierClass = 'ecm-slider-pagination-'
const paginationDisabledClass = 'ecm-slider-pagination-disabled'
const paginationProgressbarFillClass = 'ecm-slider-pagination-progressbar-fill'
const paginationProgressbarOppositeClass = 'ecm-slider-pagination-progressbar-opposite'
const paginationTotalClass = 'ecm-slider-pagination-total'
const paginationVerticalClass = 'ecm-slider-pagination-vertical'

// config that cannot be changed.
const staticConfig = {
  modules: [Navigation, Pagination, Autoplay],
  // Check all the classes in type.
  // noSwipingClass: '',
  containerModifierClass: 'ecm-slider-',
  slideClass: 'ecm-slider-slide',
  slideActiveClass: 'ecm-slider-slide-active',
  slideVisibleClass: 'ecm-slider-slide-visible',
  slideNextClass: 'ecm-slider-slide-next',
  slidePrevClass: 'ecm-slider-slide-prev',
  wrapperClass: 'ecm-slider-track',
  // lazyPreloaderClass: '',
}

// config that can be overriden via data-attribute.
const defaultDataConfig = {
  loop: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  centerInsufficientSlides: true,
  enabled: true,
  grabCursor: true,
  initialSlide: 0,

  rewind: false,
  slidesPerGroup: 1,
  slidesPerView: 1,
  spaceBetween: 16,

  autoplayDelay: 3000,

  paginationClickable: false,
  observer: false,
}

// Cast to appropriate type if a config is given, or use default value.
function setConfig<T>(key: string, value: string | null, caster: Function): T {
  if (value === null) {
    // @ts-ignore
    return defaultDataConfig[key]
  }

  return caster(value)
}

export class Slider {
  root: HTMLElement
  swiper: Swiper

  constructor(slider: HTMLElement, ecm?: ECM) {
    this.root = slider

    const target = query<HTMLElement>(slider).getElementsByClassName(sliderClass)[0]

    const navigation = {
      disabledClass: navigationDisabledClass,
      hiddenClass: navigationHiddenClass,
      nextEl: query<HTMLElement>(slider).getElementsByClassName(slideNextClass)[0],
      prevEl: query<HTMLElement>(slider).getElementsByClassName(slidePrevClass)[0],
    }

    const pagination = {
      el: query<HTMLElement>(slider).getElementsByClassName(paginationClass)[0],
      bulletActiveClass: paginationBulletActiveClass,
      bulletClass: paginationBulletClass,
      clickableClass: paginationClickableClass,
      currentClass: paginationCurrentClass,
      hiddenClass: paginationHiddenClass,
      horizontalClass: paginationHorizontalClass,
      lockClass: paginationLockClass,
      modifierClass: paginationModifierClass,
      paginationDisabledClass: paginationDisabledClass,
      progressbarFillClass: paginationProgressbarFillClass,
      progressbarOppositeClass: paginationProgressbarOppositeClass,
      totalClass: paginationTotalClass,
      verticalClass: paginationVerticalClass,
      clickable: setConfig<boolean>('paginationClickable', slider.getAttribute('data-pagination-clickable'), toBoolean),
    }

    let autoplay
    if (toBoolean(slider.getAttribute('data-autoplay'))) {
      autoplay = {
        delay: setConfig<number>('autoplayDelay', slider.getAttribute('data-autoplay-delay'), Number),
      }
    }

    const spConfig = {
      loop: setConfig<boolean>('loop', slider.getAttribute('data-loop'), toBoolean),
      centerInsufficientSlides: setConfig<boolean>(
        'centerInsufficientSlides',
        slider.getAttribute('data-center-insufficient-slides'),
        toBoolean
      ),
      centeredSlides: setConfig<boolean>('centeredSlides', slider.getAttribute('data-centered-slides'), toBoolean),
      centeredSlidesBounds: setConfig<boolean>(
        'centeredSlidesBounds',
        slider.getAttribute('data-centered-slides-bounds'),
        toBoolean
      ),
      enabled: setConfig<boolean>('enabled', slider.getAttribute('data-enabled'), toBoolean),
      grabCursor: setConfig<boolean>('grabCursor', slider.getAttribute('data-grab-cursor'), toBoolean),
      initialSlide: setConfig<number>('initialSlide', slider.getAttribute('data-initial-slide'), Number),
      rewind: setConfig<boolean>('rewind', slider.getAttribute('data-rewind'), toBoolean),
      slidesPerGroup: setConfig<number>('slidesPerGroup', slider.getAttribute('data-slides-per-group'), Number),
      slidesPerView: setConfig<number>(
        'slidesPerView',
        slider.getAttribute('data-slides-per-view'),
        (value: number | 'auto') => {
          if (value === 'auto') {
            return 'auto'
          }

          return Number(value)
        }
      ),
      spaceBetween: setConfig<number>('spaceBetween', slider.getAttribute('data-space-between'), Number),
      observer: setConfig<boolean>('observer', slider.getAttribute('data-observer'), toBoolean),
    }

    const dataConfig = {
      ...spConfig,
      breakpoints: {
        768: {} as {
          slidesPerGroup: number | undefined
          slidesPerView: number | 'auto' | undefined
          spaceBetween: number | undefined
        },
        1024: {} as {
          slidesPerGroup: number | undefined
          slidesPerView: number | 'auto' | undefined
          spaceBetween: number | undefined
        },
        1280: {} as {
          slidesPerGroup: number | undefined
          slidesPerView: number | 'auto' | undefined
          spaceBetween: number | undefined
        },
      },
    }

    const mdSlidesPerGroup = slider.getAttribute('data-md-slides-per-group')
    if (mdSlidesPerGroup) {
      dataConfig.breakpoints[768].slidesPerGroup = Number(mdSlidesPerGroup)
      dataConfig.breakpoints[1024].slidesPerGroup = Number(mdSlidesPerGroup)
      dataConfig.breakpoints[1280].slidesPerGroup = Number(mdSlidesPerGroup)
    }

    const mdSlidesPerView = slider.getAttribute('data-md-slides-per-view')
    if (mdSlidesPerView) {
      dataConfig.breakpoints[768].slidesPerView = mdSlidesPerView == 'auto' ? 'auto' : Number(mdSlidesPerView)
      dataConfig.breakpoints[1024].slidesPerView = mdSlidesPerView == 'auto' ? 'auto' : Number(mdSlidesPerView)
      dataConfig.breakpoints[1280].slidesPerView = mdSlidesPerView == 'auto' ? 'auto' : Number(mdSlidesPerView)
    }

    const mdSpaceBetween = slider.getAttribute('data-md-space-between')
    if (mdSpaceBetween) {
      dataConfig.breakpoints[768].spaceBetween = Number(mdSpaceBetween)
      dataConfig.breakpoints[1024].spaceBetween = Number(mdSpaceBetween)
      dataConfig.breakpoints[1280].spaceBetween = Number(mdSpaceBetween)
    }

    // breakpoint lg
    const lgSlidesPerGroup = slider.getAttribute('data-lg-slides-per-group')
    if (lgSlidesPerGroup) {
      dataConfig.breakpoints[1024].slidesPerGroup = Number(lgSlidesPerGroup)
      dataConfig.breakpoints[1280].slidesPerGroup = Number(lgSlidesPerGroup)
    }

    const lgSlidesPerView = slider.getAttribute('data-lg-slides-per-view')
    if (lgSlidesPerView) {
      dataConfig.breakpoints[1024].slidesPerView = lgSlidesPerView == 'auto' ? 'auto' : Number(lgSlidesPerView)
      dataConfig.breakpoints[1280].slidesPerView = lgSlidesPerView == 'auto' ? 'auto' : Number(lgSlidesPerView)
    }

    const lgSpaceBetween = slider.getAttribute('data-lg-space-between')
    if (lgSpaceBetween) {
      dataConfig.breakpoints[1024].spaceBetween = Number(lgSpaceBetween)
      dataConfig.breakpoints[1280].spaceBetween = Number(lgSpaceBetween)
    }

    // breakpoint xl
    const xlSlidesPerGroup = slider.getAttribute('data-xl-slides-per-group')
    if (xlSlidesPerGroup) dataConfig.breakpoints[1280].slidesPerGroup = Number(xlSlidesPerGroup)

    const xlSlidesPerView = slider.getAttribute('data-xl-slides-per-view')
    if (xlSlidesPerView)
      dataConfig.breakpoints[1280].slidesPerView = xlSlidesPerView == 'auto' ? 'auto' : Number(xlSlidesPerView)

    const xlSpaceBetween = slider.getAttribute('data-xl-space-between')
    if (xlSpaceBetween) dataConfig.breakpoints[1280].spaceBetween = Number(xlSpaceBetween)

    // ICW-22048:
    // When swiper creates virtual slides, it clones (?) the elements whose lazy images are not yet loaded.
    // We force load all image in the slide as a workaround.
    const forceLoadLazyImages = () => {
      if (!ecm) {
        return
      }

      const images = [
        ...this.root.querySelectorAll(`.${staticConfig.slideNextClass} img`),
        ...this.root.querySelectorAll(`.${staticConfig.slidePrevClass} img`),
        ...this.root.querySelectorAll(`.${staticConfig.slideActiveClass} img`),
      ] as HTMLImageElement[]

      for (let image of images) {
        ecm.lazyImageObserver.load(image)
      }
    }

    this.swiper = new Swiper(target, {
      ...staticConfig,
      ...dataConfig,
      navigation,
      pagination,
      autoplay,
      on: {
        slidesUpdated: () => {
          forceLoadLazyImages()
        },
        // Will only work if data-observer="true"
        observerUpdate: () => {
          this.swiper.update()
        },
      },
    })

    this.addEvents()
  }

  addEvents() {
    this.root.addEventListener('ecmSliderGetInstance', (e) => {
      const { callback } = (e as CustomEvent).detail
      callback(this)
    })
  }
}
