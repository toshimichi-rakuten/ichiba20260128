/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { Suggestion, type SuggestionElements } from './index'
import { EventBus } from '../event-bus'
import { TemplateManager, type API } from '../index'
import Handlebars from 'handlebars'

describe('Suggestion', () => {
  let root: HTMLElement
  let container: HTMLElement
  let textInput: HTMLInputElement
  let suggestionTemplate: HTMLTemplateElement
  let loadingTemplate: HTMLTemplateElement
  let eventBus: EventBus
  let templateManager: TemplateManager
  let mockAPI: API

  function createMockElements(): SuggestionElements {
    root = document.createElement('div')

    container = document.createElement('div')
    container.className = 'scm-ai-search-text-input-suggestion-wrapper'

    textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.className = 'scm-ai-search-text-input'

    suggestionTemplate = document.createElement('template')
    suggestionTemplate.setAttribute('data-template', 'ai-search-suggestion')
    suggestionTemplate.innerHTML = '<div class="scm-ai-search-text-input-suggestion">{{value}}</div>'

    loadingTemplate = document.createElement('template')
    loadingTemplate.setAttribute('data-template', 'ai-search-suggestion-loading')
    loadingTemplate.innerHTML = '<div class="scm-ai-search-text-input-suggestion-loading">Loading...</div>'

    root.appendChild(container)
    root.appendChild(textInput)
    root.appendChild(suggestionTemplate)
    root.appendChild(loadingTemplate)
    document.body.appendChild(root)

    const handlebars = Handlebars.create()
    templateManager = new TemplateManager(root, handlebars)

    return {
      container,
      textInput,
      suggestionTemplate,
      loadingTemplate,
    }
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    eventBus = new EventBus()

    mockAPI = {
      fetchSuggest: vi.fn().mockResolvedValue({
        status: 'success',
        data: { suggestedQueries: ['suggestion 1', 'suggestion 2', 'suggestion 3'] },
      }),
      fetchSearch: vi.fn(),
    } as any
  })

  it('should initialize without error', () => {
    const elements = createMockElements()

    expect(() => {
      new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)
    }).not.toThrow()
  })

  it('should render loading state on initialization', () => {
    const elements = createMockElements()

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    expect(container.innerHTML).toContain('Loading...')
  })

  it('should fetch and render suggestions', async () => {
    const elements = createMockElements()

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    await vi.waitFor(() => {
      expect(mockAPI.fetchSuggest).toHaveBeenCalled()
    })

    await vi.waitFor(() => {
      expect(container.innerHTML).toContain('suggestion 1')
      expect(container.innerHTML).toContain('suggestion 2')
      expect(container.innerHTML).toContain('suggestion 3')
    })
  })

  it('should populate text input when suggestion is clicked', async () => {
    const elements = createMockElements()

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    await vi.waitFor(() => {
      const suggestionElements = container.querySelectorAll('.scm-ai-search-text-input-suggestion')
      expect(suggestionElements.length).toBeGreaterThan(0)
    })

    const firstSuggestion = container.querySelector('.scm-ai-search-text-input-suggestion') as HTMLElement
    firstSuggestion.click()

    expect(textInput.value).toBe('suggestion 1')
  })

  it('should mark clicked suggestion as selected', async () => {
    const elements = createMockElements()

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    await vi.waitFor(() => {
      const suggestionElements = container.querySelectorAll('.scm-ai-search-text-input-suggestion')
      expect(suggestionElements.length).toBeGreaterThan(0)
    })

    const firstSuggestion = container.querySelector('.scm-ai-search-text-input-suggestion') as HTMLElement
    firstSuggestion.click()

    expect(firstSuggestion.classList.contains('scm-ai-search-text-input-suggestion-selected')).toBe(true)
  })

  it('should clear selections when text input changes', async () => {
    const elements = createMockElements()

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    await vi.waitFor(() => {
      const suggestionElements = container.querySelectorAll('.scm-ai-search-text-input-suggestion')
      expect(suggestionElements.length).toBeGreaterThan(0)
    })

    const firstSuggestion = container.querySelector('.scm-ai-search-text-input-suggestion') as HTMLElement
    firstSuggestion.click()

    textInput.value = 'new input'
    textInput.dispatchEvent(new Event('input'))

    expect(firstSuggestion.classList.contains('scm-ai-search-text-input-suggestion-selected')).toBe(false)
  })

  it('should clear selections on form:reset event', async () => {
    const elements = createMockElements()

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    await vi.waitFor(() => {
      const suggestionElements = container.querySelectorAll('.scm-ai-search-text-input-suggestion')
      expect(suggestionElements.length).toBeGreaterThan(0)
    })

    const firstSuggestion = container.querySelector('.scm-ai-search-text-input-suggestion') as HTMLElement
    firstSuggestion.click()

    eventBus.emit('form:reset')

    expect(firstSuggestion.classList.contains('scm-ai-search-text-input-suggestion-selected')).toBe(false)
  })

  it('should render fallback suggestions on API error', async () => {
    const elements = createMockElements()

    mockAPI.fetchSuggest = vi.fn().mockResolvedValue({
      status: 'success',
      data: { suggestedQueries: ['fallback 1', 'fallback 2'] },
    })

    new Suggestion(root, elements, 'test-prefix', templateManager, mockAPI, eventBus)

    await vi.waitFor(() => {
      expect(container.innerHTML).toContain('fallback 1')
      expect(container.innerHTML).toContain('fallback 2')
    })
  })
})
