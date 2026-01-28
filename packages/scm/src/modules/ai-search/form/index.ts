import type { FilterSelect, FilterMultiSelect, FilterRange, API } from '..'
import type { SearchParams, SearchFilters } from '../api'
import type { EventBus } from '../event-bus'

export type FormElements = {
  textInput: HTMLTextAreaElement
  rangeSliderFrom: HTMLInputElement
  rangeSliderTo: HTMLInputElement
}

type FormProps = {
  root: HTMLFormElement
  eventBus: EventBus
  api: API
  filters: (FilterSelect | FilterMultiSelect | FilterRange)[]
  els: FormElements
}

function extractPriceRange(params: {
  minValue: number
  maxValue: number
  rangeMin: number
  rangeMax: number
}): SearchFilters['priceRange'] | null {
  const { minValue, maxValue, rangeMin, rangeMax } = params
  const priceRange: { min?: number; max?: number } = {}

  // Unset if value is rangeMin
  if (minValue !== rangeMin) {
    priceRange.min = minValue
  }

  // Unset if value is rangeMax
  if (maxValue !== rangeMax) {
    priceRange.max = maxValue
  }

  if (Object.keys(priceRange).length === 0) {
    return null
  }

  return priceRange
}

function extractFilterValues(
  filter: FilterSelect | FilterMultiSelect | FilterRange,
  formData: FormData
): { key: string; value: string | string[] } | null {
  if (filter.type === 'multiselect') {
    const values = formData.getAll(filter.name)
    if (values.length > 0) {
      return { key: filter.name, value: values as string[] }
    }
  } else if (filter.type === 'select') {
    const value = formData.get(filter.name)
    if (value) {
      return { key: filter.name, value: value as string }
    }
  }

  return null
}

function extractKeyword(formData: FormData): string {
  return (formData.get('keyword') as string) || ''
}

export class Form {
  root: HTMLFormElement
  textInput: HTMLTextAreaElement
  rangeSliderFrom: HTMLInputElement
  rangeSliderTo: HTMLInputElement
  isSubmitting: boolean = false
  filters: (FilterSelect | FilterMultiSelect | FilterRange)[]
  eventBus: EventBus
  api: API

  constructor({ root, eventBus, api, filters, els }: FormProps) {
    this.root = root
    this.filters = filters
    this.textInput = els.textInput
    this.rangeSliderFrom = els.rangeSliderFrom
    this.rangeSliderTo = els.rangeSliderTo
    this.eventBus = eventBus
    this.api = api

    this.setup()
    this.subscribeToEvents()
    this.initialize()
  }

  private setup() {
    this.root.addEventListener('submit', async (e) => {
      e.preventDefault()
      await this.submit()
      // Since API response is fast, it's better for UX to only scroll once the request finishes.
      this.eventBus.emit('form:submitted')
    })
  }

  private subscribeToEvents() {
    this.eventBus.on('form:reset', () => this.reset())
  }

  private async initialize() {
    await this.submit()
  }

  async submit() {
    if (this.isSubmitting) {
      return
    }

    this.isSubmitting = true

    try {
      const formData = new FormData(this.root)
      const apiFilters: SearchFilters = {}

      for (const filter of this.filters) {
        if (filter.type === 'range') {
          const minValue = parseInt(this.rangeSliderFrom.value)
          const maxValue = parseInt(this.rangeSliderTo.value)
          const { min: rangeMin, max: rangeMax } = filter.priceRange

          const priceRange = extractPriceRange({ minValue, maxValue, rangeMin, rangeMax })
          if (priceRange) {
            apiFilters.priceRange = priceRange
          }
        } else {
          const filterValue = extractFilterValues(filter, formData)
          if (filterValue) {
            apiFilters[filterValue.key as keyof SearchFilters] = filterValue.value as any
          }
        }
      }

      const query = extractKeyword(formData)

      const searchParams: SearchParams = {
        filters: apiFilters,
      }

      if (query) {
        searchParams.query = query
      }

      this.eventBus.emit('results:render-loading')

      const searchData = await this.api.fetchSearch(searchParams)
      if ('errorType' in searchData) {
        this.eventBus.emit('results:render-error')
        return
      }

      if (!searchData?.data) {
        this.eventBus.emit('results:render-empty')
        return
      }

      this.eventBus.emit('results:render', {
        items: searchData.data.items,
        headline: searchData.data.headline,
      })
    } finally {
      this.isSubmitting = false
    }
  }

  private reset() {
    this.textInput.value = ''
  }
}
