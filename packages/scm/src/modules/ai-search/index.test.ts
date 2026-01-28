/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { AISearch, SettingsManager, TemplateManager, API, type AISearchSettings } from '.'
import { EventBus } from './event-bus'
import type { SuggestResponse, SearchResponse, ErrorResponse } from './api'
import Handlebars from 'handlebars'

describe('EventBus', () => {
  let eventBus: EventBus

  beforeEach(() => {
    eventBus = new EventBus()
  })

  it('should subscribe to events', () => {
    const handler = vi.fn()
    eventBus.on('form:reset', handler)
    eventBus.emit('form:reset')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should pass data to handlers', () => {
    const handler = vi.fn()
    const data = { items: [], headline: 'test' }
    eventBus.on('results:render', handler)
    eventBus.emit('results:render', data)
    expect(handler).toHaveBeenCalledWith(data)
  })

  it('should unsubscribe from events', () => {
    const handler = vi.fn()
    const unsubscribe = eventBus.on('form:reset', handler)
    unsubscribe()
    eventBus.emit('form:reset')
    expect(handler).not.toHaveBeenCalled()
  })

  it('should handle multiple handlers for the same event', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    eventBus.on('form:reset', handler1)
    eventBus.on('form:reset', handler2)
    eventBus.emit('form:reset')
    expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).toHaveBeenCalledTimes(1)
  })

  it('should clear all listeners', () => {
    const handler = vi.fn()
    eventBus.on('form:reset', handler)
    eventBus.clear()
    eventBus.emit('form:reset')
    expect(handler).not.toHaveBeenCalled()
  })

  it('should handle emitting events with no listeners', () => {
    expect(() => {
      eventBus.emit('form:reset')
    }).not.toThrow()
  })

  it('should allow off method to remove handlers', () => {
    const handler = vi.fn()
    eventBus.on('form:reset', handler)
    eventBus.off('form:reset', handler)
    eventBus.emit('form:reset')
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('SettingsManager', () => {
  it('should parse settings from script tag', () => {
    const root = document.createElement('div')
    const script = document.createElement('script')
    const settings: AISearchSettings = {
      ratPrefix: 'test',
      minResultScrollOffset: 0,
      api: {
        suggest: {
          url: 'https://example.com/suggest',
          searchParameters: {},
          fallback: { suggestedQueries: [] },
        },
        search: {
          url: 'https://example.com/search',
          queryParameters: {},
        },
      },
      filters: [],
    }
    script.setAttribute('data-settings', '')
    script.textContent = JSON.stringify(settings)
    root.appendChild(script)

    const settingsManager = new SettingsManager(root)
    expect(settingsManager.settings).toEqual(settings)
  })

  it('should throw error if settings script not found', () => {
    const root = document.createElement('div')
    expect(() => new SettingsManager(root)).toThrow('settings not found')
  })

  it('should throw error if settings JSON is invalid', () => {
    const root = document.createElement('div')
    const script = document.createElement('script')
    script.setAttribute('data-settings', '')
    script.textContent = 'invalid json'
    root.appendChild(script)

    expect(() => new SettingsManager(root)).toThrow('failed to parse settings JSON')
  })
})

describe('TemplateManager', () => {
  it('should register templates from DOM', () => {
    const root = document.createElement('div')
    const template = document.createElement('template')
    template.setAttribute('data-template', 'test-template')
    template.innerHTML = '<div>{{title}}</div>'
    root.appendChild(template)

    const handlebars = Handlebars.create()
    const templateManager = new TemplateManager(root, handlebars)

    expect(templateManager.templates.has('test-template')).toBe(true)
  })

  it('should compile templates with data', () => {
    const root = document.createElement('div')
    const template = document.createElement('template')
    template.setAttribute('data-template', 'test-template')
    template.innerHTML = '<div>{{title}}</div>'
    root.appendChild(template)

    const handlebars = Handlebars.create()
    const templateManager = new TemplateManager(root, handlebars)

    const result = templateManager.compile('test-template', { title: 'Hello' })
    expect(result).toBe('<div>Hello</div>')
  })

  it('should throw error if template not found', () => {
    const root = document.createElement('div')
    const handlebars = Handlebars.create()
    const templateManager = new TemplateManager(root, handlebars)

    expect(() => templateManager.compile('non-existent', {})).toThrow('[data-template="non-existent"] not found')
  })

  it('should register templates as Handlebars partials', () => {
    const root = document.createElement('div')
    const template = document.createElement('template')
    template.setAttribute('data-template', 'test-partial')
    template.innerHTML = '<span>{{text}}</span>'
    root.appendChild(template)

    const handlebars = Handlebars.create()
    const templateManager = new TemplateManager(root, handlebars)

    const mainTemplate = document.createElement('template')
    mainTemplate.setAttribute('data-template', 'main')
    mainTemplate.innerHTML = '<div>{{> test-partial}}</div>'
    root.appendChild(mainTemplate)

    templateManager.templates.set('main', '<div>{{> test-partial}}</div>')
    const result = templateManager.compile('main', { text: 'Test' })
    expect(result).toBe('<div><span>Test</span></div>')
  })

  it('should skip templates without data-template attribute', () => {
    const root = document.createElement('div')
    const template1 = document.createElement('template')
    template1.innerHTML = '<div>No attribute</div>'
    root.appendChild(template1)

    const template2 = document.createElement('template')
    template2.setAttribute('data-template', 'valid-template')
    template2.innerHTML = '<div>Valid</div>'
    root.appendChild(template2)

    const handlebars = Handlebars.create()
    const templateManager = new TemplateManager(root, handlebars)

    expect(templateManager.templates.size).toBe(1)
    expect(templateManager.templates.has('valid-template')).toBe(true)
  })
})

describe('API', () => {
  const mockSettings: AISearchSettings = {
    ratPrefix: 'test',
    minResultScrollOffset: 0,
    api: {
      suggest: {
        url: 'https://example.com/suggest',
        searchParameters: { param1: 'value1' },
        fallback: { suggestedQueries: ['fallback1', 'fallback2'] },
      },
      search: {
        url: 'https://example.com/search',
        queryParameters: { param2: 'value2' },
      },
    },
    filters: [],
  }

  it('should call fetchSearch with correct parameters', async () => {
    const mockSearchResponse: SearchResponse = {
      status: 'success',
      data: { headline: 'Results', items: [] },
    }
    const fetchSearchFn = vi.fn().mockResolvedValue(mockSearchResponse)
    const fetchSuggestFn = vi.fn()

    const api = new API(mockSettings, fetchSuggestFn, fetchSearchFn)
    const searchParams = { query: 'test', filters: {} }
    const result = await api.fetchSearch(searchParams)

    expect(fetchSearchFn).toHaveBeenCalledWith('https://example.com/search', { param2: 'value2' }, searchParams)
    expect(result).toEqual(mockSearchResponse)
  })

  it('should return fallback on suggest error', async () => {
    const errorResponse: ErrorResponse = { errorType: 'system' }
    const fetchSuggestFn = vi.fn().mockResolvedValue(errorResponse)
    const fetchSearchFn = vi.fn()

    const api = new API(mockSettings, fetchSuggestFn, fetchSearchFn)
    const result = await api.fetchSuggest()

    expect(result).toEqual({
      status: 'success',
      data: { suggestedQueries: ['fallback1', 'fallback2'] },
    })
  })

  it('should return fallback on suggest exception', async () => {
    const fetchSuggestFn = vi.fn().mockRejectedValue(new Error('Network error'))
    const fetchSearchFn = vi.fn()

    const api = new API(mockSettings, fetchSuggestFn, fetchSearchFn)
    const result = await api.fetchSuggest()

    expect(result).toEqual({
      status: 'success',
      data: { suggestedQueries: ['fallback1', 'fallback2'] },
    })
  })

  it('should return suggest response on success', async () => {
    const mockSuggestResponse: SuggestResponse = {
      status: 'success',
      data: { suggestedQueries: ['query1', 'query2'] },
    }
    const fetchSuggestFn = vi.fn().mockResolvedValue(mockSuggestResponse)
    const fetchSearchFn = vi.fn()

    const api = new API(mockSettings, fetchSuggestFn, fetchSearchFn)
    const result = await api.fetchSuggest()

    expect(result).toEqual(mockSuggestResponse)
  })
})

describe('AISearch', () => {
  function createMockHTML(): string {
    const settings: AISearchSettings = {
      ratPrefix: 'test',
      minResultScrollOffset: 0,
      api: {
        suggest: {
          url: 'https://example.com/suggest',
          searchParameters: {},
          fallback: { suggestedQueries: [] },
        },
        search: {
          url: 'https://example.com/search',
          queryParameters: {},
        },
      },
      filters: [
        {
          type: 'range',
          name: 'price',
          priceRange: {
            min: 0,
            max: 10000,
            stepper: 1000,
            defaultMin: 0,
            defaultMax: 10000,
          },
          currencyText: 'yen',
          noLowerLimitText: 'No min',
          noUpperLimitText: 'No max',
          minLabel: 'Min',
          maxLabel: 'Max',
        },
      ],
    }

    return `
      <div data-module-name="scm-ai-search">
        <script data-settings type="application/json">${JSON.stringify(settings)}</script>

        <template data-template="ai-search-form">
          <form>
            <input class="scm-ai-search-text-input" type="text" />
            <input data-scm-search-ai-range-slider-from-slider type="range" min="0" max="10000" value="0" />
            <input data-scm-search-ai-range-slider-to-slider type="range" min="0" max="10000" value="10000" />
            {{{selects}}}
          </form>
        </template>

        <template data-template="ai-search-suggestion">
          <div>{{query}}</div>
        </template>

        <template data-template="ai-search-suggestion-loading">
          <div>Loading...</div>
        </template>

        <template data-template="ai-search-results">
          <div>{{headline}}</div>
        </template>

        <template data-template="ai-search-results-loading">
          <div>Loading results...</div>
        </template>

        <template data-template="ai-search-results-empty">
          <div>No results</div>
        </template>

        <template data-template="ai-search-results-error">
          <div>Error</div>
        </template>

        <template data-template="ai-search-ad">
          <div>Ad</div>
        </template>

        <div data-output="form"></div>
        <div data-output="results"></div>
        <div class="scm-ai-search-text-input-suggestion-wrapper"></div>
        <button class="scm-ai-search-submit-reset-button">Reset</button>

        <div class="scm-search-ai-range-slider-from-thumb"></div>
        <div class="scm-search-ai-range-slider-to-thumb"></div>
        <div class="scm-search-ai-range-slider-from-bubble">
          <span data-scm-search-ai-range-slider-from-value-bubble></span>
        </div>
        <div class="scm-search-ai-range-slider-to-bubble">
          <span data-scm-search-ai-range-slider-to-value-bubble></span>
        </div>
        <div class="scm-search-ai-range-slider-combined-bubble">
          <span data-scm-search-ai-range-slider-from-value-combined></span>
          <span data-scm-search-ai-range-slider-to-value-combined></span>
        </div>
      </div>
    `
  }

  beforeEach(() => {
    document.body.innerHTML = createMockHTML()
    // Set required CSS variables for RangeSlider
    document.documentElement.style.setProperty('--scm-ai-search-theme-color', '#ff0000')
    document.documentElement.style.setProperty('--scm-ai-search-track-color', '#cccccc')
  })

  it('should initialize without error', () => {
    const root = document.querySelector('[data-module-name="scm-ai-search"]') as HTMLElement
    const mockFetchSuggest = vi.fn().mockResolvedValue({
      status: 'success',
      data: { suggestedQueries: [] },
    })
    const mockFetchSearch = vi.fn().mockResolvedValue({
      status: 'success',
      data: { headline: '', items: [] },
    })

    expect(() => {
      new AISearch(root, {
        fetchSuggest: mockFetchSuggest,
        fetchSearch: mockFetchSearch,
      })
    }).not.toThrow()
  })

  it('should create all necessary managers', () => {
    const root = document.querySelector('[data-module-name="scm-ai-search"]') as HTMLElement
    const mockFetchSuggest = vi.fn().mockResolvedValue({
      status: 'success',
      data: { suggestedQueries: [] },
    })
    const mockFetchSearch = vi.fn().mockResolvedValue({
      status: 'success',
      data: { headline: '', items: [] },
    })

    const aiSearch = new AISearch(root, {
      fetchSuggest: mockFetchSuggest,
      fetchSearch: mockFetchSearch,
    })

    expect(aiSearch.settingsManager).toBeDefined()
    expect(aiSearch.templateManager).toBeDefined()
    expect(aiSearch.api).toBeDefined()
    expect(aiSearch.tracking).toBeDefined()
    expect(aiSearch.renderer).toBeDefined()
    expect(aiSearch.eventBus).toBeDefined()
  })

  it('should render form on initialization', () => {
    const root = document.querySelector('[data-module-name="scm-ai-search"]') as HTMLElement
    const mockFetchSuggest = vi.fn().mockResolvedValue({
      status: 'success',
      data: { suggestedQueries: [] },
    })
    const mockFetchSearch = vi.fn().mockResolvedValue({
      status: 'success',
      data: { headline: '', items: [] },
    })

    new AISearch(root, {
      fetchSuggest: mockFetchSuggest,
      fetchSearch: mockFetchSearch,
    })

    const formOutput = root.querySelector('[data-output="form"]')
    expect(formOutput).toBeDefined()
    expect(formOutput?.querySelector('form')).not.toBeNull()
  })
})
