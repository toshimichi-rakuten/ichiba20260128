import type { GiftItem } from '../api'
import { getTemplateContent } from '../'
import type { TemplateManager, AISearchSettings } from '../'
import type { EventBus } from '../event-bus'

function renderRatingStars(average: number) {
  const MAX_SCORE = 5

  const floored = Math.floor(average)
  const hasHalf = average % 1 !== 0
  const empty = MAX_SCORE - floored - (hasHalf ? 1 : 0)

  const filled = '<i class="ecm-icon-rating-filled" aria-hidden="true"></i>'.repeat(floored)
  const half = hasHalf ? '<i class="ecm-icon-rating-half" aria-hidden="true"></i>' : ''
  const emptyStars = '<i class="ecm-icon-rating-outlined" aria-hidden="true"></i>'.repeat(empty)

  return filled + half + emptyStars
}

export type ResultsElements = {
  container: HTMLElement
  resultsTemplate: HTMLTemplateElement
  loadingTemplate: HTMLTemplateElement
  emptyTemplate: HTMLTemplateElement
  errorTemplate: HTMLTemplateElement
  adTemplate: HTMLTemplateElement
}

export type ResultsProps = {
  els: ResultsElements
  templateManager: TemplateManager
  eventBus: EventBus
  settings: AISearchSettings
}

export class Results {
  container: HTMLElement
  loadingTemplateContent: string
  emptyTemplateContent: string
  errorTemplateContent: string
  ratPrefix: string
  templateManager: TemplateManager
  eventBus: EventBus
  settings: AISearchSettings

  constructor(props: ResultsProps) {
    this.container = props.els.container
    this.ratPrefix = props.settings.ratPrefix
    this.templateManager = props.templateManager
    this.eventBus = props.eventBus
    this.settings = props.settings

    this.loadingTemplateContent = getTemplateContent(props.els.loadingTemplate)
    this.emptyTemplateContent = getTemplateContent(props.els.emptyTemplate)
    this.errorTemplateContent = getTemplateContent(props.els.errorTemplate)

    this.subscribeToEvents()
  }

  private subscribeToEvents() {
    this.eventBus.on('results:render-loading', () => {
      this.renderLoading()
    })
    this.eventBus.on('results:render-empty', () => {
      this.renderEmpty()
    })
    this.eventBus.on('results:render-error', () => {
      this.renderError()
    })
    this.eventBus.on('results:render', (data) => {
      this.render(data.items, data.headline)
    })
    this.eventBus.on('form:submitted', () => {
      this.scroll()
    })
  }

  private scroll() {
    // hack. should be configured in the HTML.
    const toggleNavi = document.querySelector('.scm-floating-toggle-navi') as HTMLElement
    const floatingNavi = document.querySelector('.scm-floating-navi') as HTMLElement

    const naviElement = toggleNavi || floatingNavi
    const naviOffset = naviElement ? naviElement.offsetHeight : 0
    const offset = Math.max(naviOffset, this.settings.minResultScrollOffset)

    const containerTop = this.container.getBoundingClientRect().top
    const scrollPosition = window.scrollY + containerTop - offset

    window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
  }

  renderLoading() {
    this.container.innerHTML = this.loadingTemplateContent
  }

  renderEmpty() {
    this.container.innerHTML = this.emptyTemplateContent
  }

  renderError() {
    this.container.innerHTML = this.errorTemplateContent
  }

  render(items: GiftItem[], headline: string) {
    if (!items || items.length === 0) {
      this.renderEmpty()
      return
    }

    const resultsHTML = this.templateManager.compile('ai-search-results', {
      ratPrefix: this.ratPrefix,
      headline: headline,
      items: items.map((itemData) => ({
        image: itemData.image,
        text: itemData.text,
        price: itemData.price,
        hasPriceRange: itemData.hasPriceRange,
        ratingStars: renderRatingStars(itemData.rating || 0),
        ratingAverage: itemData.rating,
        originalItemUrl: itemData.originalItemUrl,
        originalItemUrlWithSID: this.addSID(itemData.originalItemUrl),
        reviewCount: this.formatNumber(itemData.reviewCount ?? 0),
        giftLabels: Array.isArray(itemData.giftLabels) ? itemData.giftLabels.slice(0, 2) : [],
        isShippingFree: itemData.shipping?.price === '0',
      })),
    })

    this.container.innerHTML = resultsHTML
  }

  private formatNumber(num: number | string): string {
    if (typeof num === 'string') {
      const parsed = parseInt(num, 10)
      if (isNaN(parsed)) {
        return '0'
      }
      return parsed.toLocaleString('en-US')
    }

    if (typeof num === 'number') {
      return num.toLocaleString('en-US')
    }

    // Just in case.
    return num
  }

  // Cannot use hbs to render {{ ratPrefix }}
  private addSID(url: string): string {
    const urlObj = new URL(url)
    urlObj.searchParams.set('s-id', `${this.ratPrefix}_udr_aisearch_item`)
    return urlObj.toString()
  }
}
