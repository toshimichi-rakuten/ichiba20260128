import { sendRATCustomEvent } from '../rat'
import { debounce } from '@ecm/_utils'
import { getTemplateContent } from '../'
import type { API, TemplateManager } from '../'
import type { EventBus } from '../event-bus'

export type SuggestionElements = {
  container: HTMLElement
  textInput: HTMLInputElement
  suggestionTemplate: HTMLTemplateElement
  loadingTemplate: HTMLTemplateElement
}

export class Suggestion {
  root: HTMLElement
  container: HTMLElement
  textInput: HTMLInputElement
  loadingTemplateContent: string
  ratPrefix: string
  api: API
  eventBus: EventBus
  debouncedSendInputRAT: () => void
  templateManager: TemplateManager

  constructor(
    root: HTMLElement,
    els: SuggestionElements,
    ratPrefix: string,
    templateManager: TemplateManager,
    api: API,
    eventBus: EventBus
  ) {
    this.root = root
    this.container = els.container
    this.textInput = els.textInput
    this.loadingTemplateContent = getTemplateContent(els.loadingTemplate)
    this.ratPrefix = ratPrefix
    this.templateManager = templateManager
    this.api = api
    this.eventBus = eventBus
    this.debouncedSendInputRAT = debounce(this.sendInputRAT.bind(this), 1000)

    this.setupTextInputListener()
    this.subscribeToEvents()
    this.initialize()
  }

  private subscribeToEvents() {
    this.eventBus.on('form:reset', () => this.clearSelections())
  }

  private async initialize() {
    this.renderLoading()
    const suggestData = await this.api.fetchSuggest()
    this.render(suggestData.data.suggestedQueries)
    this.setupSuggestionClicks()
  }

  private setupSuggestionClicks() {
    // add the listener to root so we don't need to add listener on each suggestions
    this.root.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.scm-ai-search-text-input-suggestion') as HTMLElement

      if (!target) {
        return
      }

      e.stopPropagation()

      this.clearSelections()
      this.textInput.value = target.textContent?.trim() || ''
      target.classList.add('scm-ai-search-text-input-suggestion-selected')
    })
  }

  private setupTextInputListener() {
    this.textInput.addEventListener('input', () => {
      this.clearSelections()
      this.debouncedSendInputRAT()
    })
  }

  private sendInputRAT() {
    const ratEventId = this.textInput.getAttribute('data-rat-custom-event-id')
    if (!ratEventId) {
      return
    }

    const eventType = this.textInput.getAttribute('data-rat-custom-event-type')
    if (!eventType) {
      return
    }

    sendRATCustomEvent(ratEventId, eventType)
  }

  renderLoading() {
    const loadingItems = Array(5).fill(null)
    const suggestionsHTML = loadingItems.map(() => this.loadingTemplateContent).join('')
    this.container.innerHTML = suggestionsHTML
  }

  render(suggestions: string[]) {
    const suggestionsHTML = suggestions
      .map((suggestion, index) =>
        this.templateManager.compile('ai-search-suggestion', {
          value: suggestion,
          index: index + 1,
          ratPrefix: this.ratPrefix,
        })
      )
      .join('')
    this.container.innerHTML = suggestionsHTML
  }

  clearSelections() {
    const suggestions = [...this.root.querySelectorAll('.scm-ai-search-text-input-suggestion')]
    for (const suggestion of suggestions) {
      suggestion.classList.remove('scm-ai-search-text-input-suggestion-selected')
    }
  }
}
