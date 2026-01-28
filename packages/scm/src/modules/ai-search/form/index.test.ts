/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { Form, type FormElements } from './index'
import { EventBus } from '../event-bus'
import type { API } from '../index'
import type { SearchResponse, ErrorResponse } from '../api'

describe('Form', () => {
  let form: HTMLFormElement
  let textInput: HTMLTextAreaElement
  let rangeSliderFrom: HTMLInputElement
  let rangeSliderTo: HTMLInputElement
  let eventBus: EventBus
  let mockAPI: API

  function createMockElements(): FormElements {
    form = document.createElement('form')

    textInput = document.createElement('textarea')
    textInput.name = 'keyword'
    textInput.className = 'scm-ai-search-text-input'

    rangeSliderFrom = document.createElement('input')
    rangeSliderFrom.type = 'range'
    rangeSliderFrom.name = 'priceFrom'
    rangeSliderFrom.value = '0'
    rangeSliderFrom.min = '0'
    rangeSliderFrom.max = '10000'
    rangeSliderFrom.setAttribute('data-scm-search-ai-range-slider-from-slider', '')

    rangeSliderTo = document.createElement('input')
    rangeSliderTo.type = 'range'
    rangeSliderTo.name = 'priceTo'
    rangeSliderTo.value = '10000'
    rangeSliderTo.min = '0'
    rangeSliderTo.max = '10000'
    rangeSliderTo.setAttribute('data-scm-search-ai-range-slider-to-slider', '')

    form.appendChild(textInput)
    form.appendChild(rangeSliderFrom)
    form.appendChild(rangeSliderTo)
    document.body.appendChild(form)

    return {
      textInput,
      rangeSliderFrom,
      rangeSliderTo,
    }
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    eventBus = new EventBus()

    const mockSearchResponse: SearchResponse = {
      status: 'success',
      data: {
        headline: 'Test Results',
        items: [],
      },
    }

    mockAPI = {
      fetchSearch: vi.fn().mockResolvedValue(mockSearchResponse),
      fetchSuggest: vi.fn(),
    } as any
  })

  it('should initialize without error', async () => {
    const elements = createMockElements()

    expect(() => {
      new Form({
        root: form,
        eventBus,
        api: mockAPI,
        filters: [
          {
            type: 'range',
            name: 'price',
            priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
            currencyText: 'yen',
            noLowerLimitText: 'No min',
            noUpperLimitText: 'No max',
            minLabel: 'Min',
            maxLabel: 'Max',
          },
        ],
        els: elements,
      })
    }).not.toThrow()

    await vi.waitFor(() => {
      expect(mockAPI.fetchSearch).toHaveBeenCalled()
    })
  })

  it('should submit form on form submit event', async () => {
    const elements = createMockElements()

    const formInstance = new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(mockAPI.fetchSearch).toHaveBeenCalled()
      expect(formInstance.isSubmitting).toBe(false)
    })

    const submitEvent = new SubmitEvent('submit', { cancelable: true, bubbles: true })
    form.dispatchEvent(submitEvent)

    await vi.waitFor(() => {
      expect(mockAPI.fetchSearch).toHaveBeenCalledTimes(2)
    }, { timeout: 2000 })
  })

  it('should emit results:render-loading before fetching', async () => {
    const elements = createMockElements()
    const handler = vi.fn()
    eventBus.on('results:render-loading', handler)

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(handler).toHaveBeenCalled()
    })
  })

  it('should emit results:render on successful search', async () => {
    const elements = createMockElements()
    const handler = vi.fn()
    eventBus.on('results:render', handler)

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(handler).toHaveBeenCalled()
    })
  })

  it('should emit results:render-error on API error', async () => {
    const elements = createMockElements()
    const handler = vi.fn()
    eventBus.on('results:render-error', handler)

    const errorResponse: ErrorResponse = { errorType: 'system' }
    mockAPI.fetchSearch = vi.fn().mockResolvedValue(errorResponse)

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(handler).toHaveBeenCalled()
    })
  })

  it('should include keyword in search params', async () => {
    const elements = createMockElements()
    textInput.value = 'test query'

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(mockAPI.fetchSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: 'test query',
        })
      )
    })
  })

  it('should include price range in search params when modified', async () => {
    const elements = createMockElements()
    rangeSliderFrom.value = '1000'
    rangeSliderTo.value = '5000'

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(mockAPI.fetchSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: expect.objectContaining({
            priceRange: { min: 1000, max: 5000 },
          }),
        })
      )
    })
  })

  it('should exclude price range when at default values', async () => {
    const elements = createMockElements()
    rangeSliderFrom.value = '0'
    rangeSliderTo.value = '10000'

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      const call = (mockAPI.fetchSearch as any).mock.calls[0]
      expect(call[0].filters?.priceRange).toBeUndefined()
    })
  })

  it('should clear text input on form:reset event', async () => {
    const elements = createMockElements()
    textInput.value = 'test query'

    new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {})

    eventBus.emit('form:reset')

    expect(textInput.value).toBe('')
  })

  it('should prevent multiple simultaneous submissions', async () => {
    const elements = createMockElements()

    const formInstance = new Form({
      root: form,
      eventBus,
      api: mockAPI,
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: { min: 0, max: 10000, stepper: 1000, defaultMin: 0, defaultMax: 10000 },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
      els: elements,
    })

    await vi.waitFor(() => {
      expect(mockAPI.fetchSearch).toHaveBeenCalled()
      expect(formInstance.isSubmitting).toBe(false)
    })

    const submitPromise1 = formInstance.submit()
    const submitPromise2 = formInstance.submit()
    const submitPromise3 = formInstance.submit()

    await Promise.all([submitPromise1, submitPromise2, submitPromise3])

    expect(mockAPI.fetchSearch).toHaveBeenCalledTimes(2)
  })
})
