/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect } from 'vitest'
import { Results, type ResultsElements } from './index'
import { EventBus } from '../event-bus'
import { TemplateManager } from '../index'
import Handlebars from 'handlebars'
import type { GiftItem } from '../api'

describe('Results', () => {
  let container: HTMLElement
  let resultsTemplate: HTMLTemplateElement
  let loadingTemplate: HTMLTemplateElement
  let emptyTemplate: HTMLTemplateElement
  let errorTemplate: HTMLTemplateElement
  let adTemplate: HTMLTemplateElement
  let eventBus: EventBus
  let templateManager: TemplateManager

  function createMockElements(): ResultsElements {
    container = document.createElement('div')
    container.setAttribute('data-output', 'results')
    document.body.appendChild(container)

    resultsTemplate = document.createElement('template')
    resultsTemplate.setAttribute('data-template', 'ai-search-results')
    resultsTemplate.innerHTML = '<div>{{headline}}</div>'

    loadingTemplate = document.createElement('template')
    loadingTemplate.setAttribute('data-template', 'ai-search-results-loading')
    loadingTemplate.innerHTML = '<div>Loading...</div>'

    emptyTemplate = document.createElement('template')
    emptyTemplate.setAttribute('data-template', 'ai-search-results-empty')
    emptyTemplate.innerHTML = '<div>No results found</div>'

    errorTemplate = document.createElement('template')
    errorTemplate.setAttribute('data-template', 'ai-search-results-error')
    errorTemplate.innerHTML = '<div>Error occurred</div>'

    adTemplate = document.createElement('template')
    adTemplate.setAttribute('data-template', 'ai-search-ad')
    adTemplate.innerHTML = '<div>Ad</div>'

    const root = document.createElement('div')
    root.appendChild(resultsTemplate)
    root.appendChild(loadingTemplate)
    root.appendChild(emptyTemplate)
    root.appendChild(errorTemplate)
    root.appendChild(adTemplate)

    const handlebars = Handlebars.create()
    templateManager = new TemplateManager(root, handlebars)

    return {
      container,
      resultsTemplate,
      loadingTemplate,
      emptyTemplate,
      errorTemplate,
      adTemplate,
    }
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    eventBus = new EventBus()
  })

  it('should initialize without error', () => {
    const els = createMockElements()

    expect(() => {
      new Results({
        els,
        templateManager,
        eventBus,
        settings: {
          ratPrefix: 'test-prefix',
          minResultScrollOffset: 0,
          api: {
            suggest: {
              url: '',
              searchParameters: {},
              fallback: { suggestedQueries: [] },
            },
            search: {
              url: '',
              queryParameters: {},
            },
          },
          filters: [],
        },
      })
    }).not.toThrow()
  })

  it('should render loading state when event is emitted', () => {
    const els = createMockElements()
    new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    eventBus.emit('results:render-loading')

    expect(container.innerHTML).toContain('Loading...')
  })

  it('should render empty state when event is emitted', () => {
    const els = createMockElements()
    new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    eventBus.emit('results:render-empty')

    expect(container.innerHTML).toContain('No results found')
  })

  it('should render error state when event is emitted', () => {
    const els = createMockElements()
    new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    eventBus.emit('results:render-error')

    expect(container.innerHTML).toContain('Error occurred')
  })

  it('should render results with items', () => {
    const els = createMockElements()
    new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    const items: GiftItem[] = [
      {
        image: 'image1.jpg',
        text: 'Item 1',
        price: '1000',
        rating: 4.5,
        reviewCount: 100,
        originalItemUrl: 'https://example.com/item1',
        hasPriceRange: false,
      },
    ]

    eventBus.emit('results:render', { items, headline: 'Test Results' })

    expect(container.innerHTML).toContain('Test Results')
  })

  it('should render empty state when items array is empty', () => {
    const els = createMockElements()
    const results = new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    results.render([], 'Test Headline')

    expect(container.innerHTML).toContain('No results found')
  })

  it('should add SID parameter to item URLs', () => {
    const els = createMockElements()
    resultsTemplate.innerHTML = '<div>{{#each items}}<a href="{{originalItemUrlWithSID}}">Link</a>{{/each}}</div>'
    templateManager.templates.set(
      'ai-search-results',
      '<div>{{#each items}}<a href="{{originalItemUrlWithSID}}">Link</a>{{/each}}</div>'
    )

    const results = new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    const items: GiftItem[] = [
      {
        image: 'image.jpg',
        text: 'Item',
        price: '1000',
        rating: 4.5,
        reviewCount: 100,
        originalItemUrl: 'https://example.com/item',
        hasPriceRange: false,
      },
    ]

    results.render(items, 'Headline')

    expect(container.innerHTML).toContain('s-id=test-prefix_udr_aisearch_item')
  })

  it('should format review count with locale', () => {
    const els = createMockElements()
    resultsTemplate.innerHTML = '<div>{{#each items}}<span>{{reviewCount}}</span>{{/each}}</div>'
    templateManager.templates.set(
      'ai-search-results',
      '<div>{{#each items}}<span>{{reviewCount}}</span>{{/each}}</div>'
    )

    const results = new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    const items: GiftItem[] = [
      {
        image: 'image.jpg',
        text: 'Item',
        price: '1000',
        rating: 4.5,
        reviewCount: 1234567,
        originalItemUrl: 'https://example.com/item',
        hasPriceRange: false,
      },
    ]

    results.render(items, 'Headline')

    expect(container.innerHTML).toContain('1,234,567')
  })

  it('should handle items without review count', () => {
    const els = createMockElements()
    resultsTemplate.innerHTML = '<span>{{reviewCount}}</span>'
    templateManager.templates.set('ai-search-results', '<span>{{reviewCount}}</span>')

    const results = new Results({
      els,
      templateManager,
      eventBus,
      settings: {
        ratPrefix: 'test-prefix',
        minResultScrollOffset: 0,
        api: {
          suggest: {
            url: '',
            searchParameters: {},
            fallback: { suggestedQueries: [] },
          },
          search: {
            url: '',
            queryParameters: {},
          },
        },
        filters: [],
      },
    })

    const items: GiftItem[] = [
      {
        image: 'image.jpg',
        text: 'Item',
        price: '1000',
        rating: 4.5,
        reviewCount: 0,
        originalItemUrl: 'https://example.com/item',
        hasPriceRange: false,
      },
    ]

    expect(() => {
      results.render(items, 'Headline')
    }).not.toThrow()
  })
})
