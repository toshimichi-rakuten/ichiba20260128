import { fetchSuggest, fetchSearch } from './api'
import Handlebars from 'handlebars'
import { Suggestion } from './suggestion'
import { SingleSelect, MultiSelect } from './select'
import { RangeSlider } from './range-slider'
import { Form } from './form'
import { ResetButton } from './form/reset-button'
import { Results } from './results'
import { EventBus } from './event-bus'
import { ECM_INITIALIZE_BLOCK_EVENT_NAME } from '@ecm/core/constants'

import type { ErrorResponse, SuggestResponse, SearchResponse, SuggestResponseData, SearchParams } from './api'
import type { SuggestionElements } from './suggestion'
import type { SelectElements } from './select'
import type { FormElements } from './form'
import type { ResultsElements } from './results'
import type { RangeSliderSettings, RangeSliderElements } from './range-slider'

// Figma: https://www.figma.com/design/bGYWwYuhiwNCDpRrNLyGeb/AI-Gift-Search?node-id=183-6806&p=f&m=dev

// DUI: https://git.rakuten-it.com/projects/DUI/repos/dynamic-ui/pull-requests/22382/diff#app%2Fpages-library%2Fpages%2Fai-gift%2Fapi%2Fai-gift-api.ts

export const SCM_MODULE_NAME = 'scm-ai-search'

export type FilterOption = {
  value: string
  label: string
}

export type PriceRange = {
  min: number
  max: number
  stepper: number
  defaultMin: number
  defaultMax: number
}

export type FilterSelect = {
  type: 'select'
  name: string
  placeholder: string
  options: FilterOption[]
  smGridSpan?: number
}

export type FilterMultiSelect = {
  type: 'multiselect'
  name: string
  placeholder: string
  options: FilterOption[]
  smGridSpan?: number
}

export type FilterRange = {
  type: 'range'
  name: string
  priceRange: PriceRange
  currencyText: string
  noLowerLimitText: string
  noUpperLimitText: string
  minLabel: string
  maxLabel: string
}

export type AISearchSettings = {
  ratPrefix: string
  minResultScrollOffset: number
  api: {
    suggest: {
      url: string
      searchParameters: Record<string, string | boolean>
      fallback: SuggestResponseData
    }
    search: {
      url: string
      queryParameters: Record<string, string | boolean>
    }
  }
  filters: (FilterSelect | FilterMultiSelect | FilterRange)[]
}

export type AISearchStyle = {
  themeColor: string
  subThemeColor: string
  thumbBgColor: string
  thumbSize: string
  trackHeight: string
  trackColor: string
  toggleBgColor: string
  heroBgTexture: string
  smFilterGridSize: number
  mdFilterGridSize: number
}

export type FetchSuggestFunction = (
  url: string,
  searchParameters: Record<string, string | boolean>
) => Promise<SuggestResponse | ErrorResponse>

export type FetchSearchFunction = (
  url: string,
  queryParameters: Record<string, string | boolean>,
  searchParams: SearchParams
) => Promise<SearchResponse | ErrorResponse>

export type AISearchOptions = {
  fetchSuggest?: FetchSuggestFunction
  fetchSearch?: FetchSearchFunction
}

export function getTemplateContent(template: HTMLTemplateElement): string {
  const html = template.innerHTML
  // <template> tag sanitizes HTML entities in innerHTML.
  // We need to decode them back for Handlebars syntax to work correctly.
  // This is necessary for things like {{> partial}} and comparison operators in {{#if}}.
  return html
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
}

export class SettingsManager {
  root: HTMLElement
  settings: AISearchSettings

  constructor(root: HTMLElement) {
    this.root = root

    const settingsScript = this.root.querySelector('[data-settings]') as HTMLScriptElement
    if (!settingsScript?.textContent) {
      throw new Error('settings not found')
    }

    try {
      this.settings = JSON.parse(settingsScript.textContent)
    } catch (e) {
      throw new Error('failed to parse settings JSON', { cause: e })
    }
  }
}

export class TemplateManager {
  root: HTMLElement
  handlebars: typeof Handlebars
  templates: Map<string, string>

  constructor(root: HTMLElement, handlebars: typeof Handlebars) {
    this.root = root
    this.handlebars = handlebars
    this.templates = new Map()

    const allTemplates = [...this.root.querySelectorAll('template[data-template]')] as HTMLTemplateElement[]

    for (const template of allTemplates) {
      const templateName = template.getAttribute('data-template')
      if (!templateName) {
        continue
      }

      const templateContent = getTemplateContent(template)
      this.templates.set(templateName, templateContent)
      this.handlebars.registerPartial(templateName, templateContent)
    }
  }

  compile(templateName: string, data: any): string {
    const templateContent = this.templates.get(templateName)

    if (!templateContent) {
      throw new Error(`[data-template="${templateName}"] not found`)
    }

    const compiled = this.handlebars.compile(templateContent)
    return compiled(data)
  }
}

export class API {
  settings: AISearchSettings
  fetchSuggestFn: FetchSuggestFunction
  fetchSearchFn: FetchSearchFunction

  constructor(settings: AISearchSettings, fetchSuggestFn: FetchSuggestFunction, fetchSearchFn: FetchSearchFunction) {
    this.settings = settings
    this.fetchSuggestFn = fetchSuggestFn
    this.fetchSearchFn = fetchSearchFn
  }

  async fetchSearch(searchParams: any = {}): Promise<SearchResponse | ErrorResponse> {
    const response = await this.fetchSearchFn(
      this.settings.api.search.url,
      this.settings.api.search.queryParameters,
      searchParams
    )

    return response
  }

  // Return fallback if ever the api failed.
  async fetchSuggest(): Promise<SuggestResponse> {
    try {
      const response = await this.fetchSuggestFn(
        this.settings.api.suggest.url,
        this.settings.api.suggest.searchParameters
      )
      if ('errorType' in response) {
        return {
          status: 'success',
          data: this.settings.api.suggest.fallback,
        }
      }
      return response
    } catch {
      return {
        status: 'success',
        data: this.settings.api.suggest.fallback,
      }
    }
  }
}

export class Tracking {
  root: HTMLElement

  constructor(root: HTMLElement) {
    this.root = root
  }

  // https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home
  initialize() {
    const RAT = window.RAT
    if (!RAT) {
      console.warn('RAT not found')
      return
    }

    const $ = RAT.$Selector

    if (!$) {
      console.warn('jQuery/RAT.$Selector not found')
      return
    }

    const $els = $(this.root).find('[data-ratid]')
    RAT.bind($els)
  }
}

export class Renderer {
  root: HTMLElement
  settings: AISearchSettings
  templateManager: TemplateManager
  api: API
  eventBus: EventBus

  constructor(
    root: HTMLElement,
    settings: AISearchSettings,
    templateManager: TemplateManager,
    api: API,
    eventBus: EventBus
  ) {
    this.root = root
    this.settings = settings
    this.templateManager = templateManager
    this.api = api
    this.eventBus = eventBus
  }

  private getSelectElements(filterName: string): SelectElements {
    const smButton = this.root.querySelector(
      `.scm-ai-search-select-sm[data-filter-name="${filterName}"]`
    )! as HTMLElement
    const mdButton = this.root.querySelector(
      `.scm-ai-search-select-md[data-filter-name="${filterName}"]`
    )! as HTMLElement

    return {
      smButton,
      mdButton,
      form: this.root.querySelector('form')!,
      dropdown: this.root.querySelector(`#ai-search-dropdown-${filterName}`)!,
      sheet: this.root.querySelector(`#ai-search-sheet-${filterName}`)!,
      smChevron: smButton.querySelector('i')!,
      mdChevron: mdButton.querySelector('i')!,
    }
  }

  private generateFiltersHTML(): string[] {
    const result: string[] = []

    for (const filter of this.settings.filters) {
      if (filter.type === 'multiselect') {
        result.push(this.generateSelectHTML(filter, 'ai-search-select-multi'))
      } else if (filter.type === 'select') {
        result.push(this.generateSelectHTML(filter, 'ai-search-select-single'))
      }
    }

    return result
  }

  private generateSelectHTML(filter: FilterSelect | FilterMultiSelect, templateName: string): string {
    const data = {
      ratPrefix: this.settings.ratPrefix,
      name: filter.name,
      placeholder: filter.placeholder,
      smGridSpan: filter.smGridSpan,
      desktopOptions: filter.options.map((option) => ({ ...option, name: filter.name })),
      mobileOptions: filter.options.map((option) => ({ ...option, name: filter.name })),
    }

    if (filter.type === 'multiselect') {
      return this.templateManager.compile(templateName, { ...data, inputType: 'checkbox' })
    }

    return this.templateManager.compile(templateName, data)
  }

  renderForm(): void {
    const form = this.root.querySelector('[data-output="form"]') as HTMLElement
    if (!form) {
      throw new Error('[data-output="form"] not found')
    }

    const rangeFilter = this.settings.filters.find((f) => f.type === 'range') as FilterRange | undefined
    if (!rangeFilter) {
      throw new Error('Range filter not found in settings')
    }

    const formHTML = this.templateManager.compile('ai-search-form', {
      ratPrefix: this.settings.ratPrefix,
      selects: this.generateFiltersHTML(),
      rangeFilter: {
        ...rangeFilter.priceRange,
        minLabel: rangeFilter.minLabel,
        maxLabel: rangeFilter.maxLabel,
      },
    })

    form.innerHTML = formHTML
  }

  getSuggestionElements(): SuggestionElements {
    return {
      container: this.root.querySelector('.scm-ai-search-text-input-suggestion-wrapper')!,
      textInput: this.root.querySelector('.scm-ai-search-text-input')!,
      suggestionTemplate: this.root.querySelector('template[data-template="ai-search-suggestion"]')!,
      loadingTemplate: this.root.querySelector('template[data-template="ai-search-suggestion-loading"]')!,
    }
  }

  getResultsElements(): ResultsElements {
    return {
      container: this.root.querySelector('[data-output="results"]')!,
      resultsTemplate: this.root.querySelector('template[data-template="ai-search-results"]')!,
      loadingTemplate: this.root.querySelector('template[data-template="ai-search-results-loading"]')!,
      emptyTemplate: this.root.querySelector('template[data-template="ai-search-results-empty"]')!,
      errorTemplate: this.root.querySelector('template[data-template="ai-search-results-error"]')!,
      adTemplate: this.root.querySelector('template[data-template="ai-search-ad"]')!,
    }
  }

  getFormElement(): HTMLFormElement {
    return this.root.querySelector('form')!
  }

  getFormElements(): FormElements {
    return {
      textInput: this.root.querySelector('.scm-ai-search-text-input')!,
      rangeSliderFrom: this.root.querySelector('[data-scm-search-ai-range-slider-from-slider]')! as HTMLInputElement,
      rangeSliderTo: this.root.querySelector('[data-scm-search-ai-range-slider-to-slider]')! as HTMLInputElement,
    }
  }

  getRangeSliderElements(): RangeSliderElements {
    return {
      fromSlider: this.root.querySelector('[data-scm-search-ai-range-slider-from-slider]')! as HTMLInputElement,
      toSlider: this.root.querySelector('[data-scm-search-ai-range-slider-to-slider]')! as HTMLInputElement,
      fromThumb: this.root.querySelector('.scm-search-ai-range-slider-from-thumb')! as HTMLElement,
      toThumb: this.root.querySelector('.scm-search-ai-range-slider-to-thumb')! as HTMLElement,
      fromBubble: this.root.querySelector('.scm-search-ai-range-slider-from-bubble')! as HTMLElement,
      toBubble: this.root.querySelector('.scm-search-ai-range-slider-to-bubble')! as HTMLElement,
      combinedBubble: this.root.querySelector('.scm-search-ai-range-slider-combined-bubble')! as HTMLElement,
      fromValueBubble: this.root.querySelector(
        '[data-scm-search-ai-range-slider-from-value-bubble]'
      )! as HTMLSpanElement,
      toValueBubble: this.root.querySelector('[data-scm-search-ai-range-slider-to-value-bubble]')! as HTMLSpanElement,
      fromValueCombined: this.root.querySelector(
        '[data-scm-search-ai-range-slider-from-value-combined]'
      )! as HTMLSpanElement,
      toValueCombined: this.root.querySelector(
        '[data-scm-search-ai-range-slider-to-value-combined]'
      )! as HTMLSpanElement,
    }
  }

  getResetButton(): HTMLButtonElement {
    return this.root.querySelector('.scm-ai-search-submit-reset-button')! as HTMLButtonElement
  }

  createSelects(eventBus: EventBus): (SingleSelect | MultiSelect)[] {
    const selects: (SingleSelect | MultiSelect)[] = []

    for (const filter of this.settings.filters) {
      if (filter.type === 'multiselect' || filter.type === 'select') {
        const selectEls = this.getSelectElements(filter.name)
        const placeholder = selectEls.smButton.querySelector('span')!.textContent!

        if (filter.type === 'multiselect') {
          selects.push(
            new MultiSelect({
              name: filter.name,
              options: filter.options,
              placeholder,
              els: selectEls,
              eventBus,
            })
          )
        } else {
          selects.push(
            new SingleSelect({
              name: filter.name,
              options: filter.options,
              placeholder,
              els: selectEls,
              eventBus,
            })
          )
        }
      }
    }

    return selects
  }

  initialize() {
    this.renderForm()

    const suggestionEls = this.getSuggestionElements()
    new Suggestion(this.root, suggestionEls, this.settings.ratPrefix, this.templateManager, this.api, this.eventBus)

    const resultsEls = this.getResultsElements()
    new Results({
      els: resultsEls,
      templateManager: this.templateManager,
      eventBus: this.eventBus,
      settings: this.settings,
    })

    const formEl = this.getFormElement()

    this.createSelects(this.eventBus)

    const rangeFilter = this.settings.filters.find((f) => f.type === 'range') as FilterRange | undefined
    if (!rangeFilter) {
      throw new Error('Range filter not found in settings')
    }

    const rangeSliderEls = this.getRangeSliderElements()

    const rangeSliderSettings: RangeSliderSettings = {
      currencyText: rangeFilter.currencyText,
      noLowerLimitText: rangeFilter.noLowerLimitText,
      noUpperLimitText: rangeFilter.noUpperLimitText,
    }

    new RangeSlider({
      els: rangeSliderEls,
      settings: rangeSliderSettings,
      eventBus: this.eventBus,
    })

    const formEls = this.getFormElements()

    new Form({
      root: formEl,
      eventBus: this.eventBus,
      api: this.api,
      filters: this.settings.filters,
      els: formEls,
    })

    const resetButtonEl = this.getResetButton()
    new ResetButton(resetButtonEl, this.eventBus)

    const event = new CustomEvent(ECM_INITIALIZE_BLOCK_EVENT_NAME, {
      detail: {
        target: this.root,
      },
    })

    document.dispatchEvent(event)
  }
}

export class AISearch {
  root: HTMLElement

  handlebars: typeof Handlebars
  settingsManager: SettingsManager
  templateManager: TemplateManager
  api: API
  tracking: Tracking
  renderer: Renderer
  eventBus: EventBus

  constructor(root: HTMLElement, options: AISearchOptions = {}) {
    this.root = root
    this.eventBus = new EventBus()
    this.handlebars = Handlebars.create()

    this.settingsManager = new SettingsManager(this.root)
    this.templateManager = new TemplateManager(this.root, this.handlebars)

    this.api = new API(
      this.settingsManager.settings,
      options.fetchSuggest || fetchSuggest,
      options.fetchSearch || fetchSearch
    )

    this.tracking = new Tracking(this.root)
    this.renderer = new Renderer(
      this.root,
      this.settingsManager.settings,
      this.templateManager,
      this.api,
      this.eventBus
    )

    this.renderer.initialize()
    // need to render first
    this.tracking.initialize()
  }
}
