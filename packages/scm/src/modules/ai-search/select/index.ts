import type { EventBus } from '../event-bus'

type SelectOption = {
  value: string
  label: string
}

export type SelectElements = {
  form: HTMLFormElement
  smButton: HTMLElement
  mdButton: HTMLElement
  dropdown: HTMLElement
  sheet: HTMLElement
  smChevron: HTMLElement
  mdChevron: HTMLElement
}

type BaseSelectParams = {
  name: string
  options: SelectOption[]
  placeholder: string
  els: SelectElements
  eventBus: EventBus
}

class BaseSelect {
  form: HTMLFormElement
  name: string
  smButton: HTMLElement
  mdButton: HTMLElement
  dropdown: HTMLElement
  sheet: HTMLElement
  options: SelectOption[]
  sheetObserver: MutationObserver
  documentClickHandler: (e: Event) => void
  placeholder: string
  smChevron: HTMLElement
  mdChevron: HTMLElement
  eventBus: EventBus

  constructor({ name, options, placeholder, els, eventBus }: BaseSelectParams) {
    this.form = els.form
    this.name = name
    this.options = options
    this.placeholder = placeholder
    this.smButton = els.smButton
    this.mdButton = els.mdButton
    this.dropdown = els.dropdown
    this.sheet = els.sheet
    this.smChevron = els.smChevron
    this.mdChevron = els.mdChevron
    this.eventBus = eventBus
    this.documentClickHandler = this.handleDocumentClick.bind(this)
  }

  setupSheet() {
    this.sheetObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
          this.handleSheetToggle()
        }
      }
    })

    this.sheetObserver.observe(this.sheet, {
      attributes: true,
      attributeFilter: ['aria-hidden'],
    })
  }

  setupDropdown() {
    this.mdButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.toggleDropdown()
    })

    document.addEventListener('click', this.documentClickHandler)
  }

  handleSheetToggle() {
    const isOpen = this.sheet.getAttribute('aria-hidden') === 'false'
    this.smChevron.classList.toggle('scm-ai-search-chevron-inverted', isOpen)
    this.smButton.setAttribute('aria-expanded', isOpen.toString())
  }

  toggleDropdown() {
    const isOpen = this.dropdown.style.display === 'block'
    this.dropdown.style.display = isOpen ? 'none' : 'block'
    this.mdButton.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
    this.mdChevron.classList.toggle('scm-ai-search-chevron-inverted', !isOpen)
  }

  closeDropdown() {
    this.dropdown.style.display = 'none'
    this.mdButton.setAttribute('aria-expanded', 'false')
    this.mdChevron.classList.remove('scm-ai-search-chevron-inverted')
  }

  handleDocumentClick(e: Event) {
    if (!this.mdButton.contains(e.target as Node) && !this.dropdown.contains(e.target as Node)) {
      this.closeDropdown()
    }
  }
}

export class SingleSelect extends BaseSelect {
  selectedValue: string | null
  hiddenInput: HTMLInputElement

  constructor(params: BaseSelectParams) {
    super(params)
    this.selectedValue = null
    this.hiddenInput = this.createHiddenInput()
    this.setup()
    this.subscribeToEvents()
  }

  private subscribeToEvents() {
    this.eventBus.on('form:reset', () => this.reset())
  }

  createHiddenInput(): HTMLInputElement {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = this.name
    input.value = ''
    this.form.appendChild(input)
    return input
  }

  setup() {
    this.setupSheet()
    this.setupDropdown()
    this.setupOptions()
    this.updateStyling()
  }

  setupOptions() {
    const allOptions = [
      ...this.dropdown.querySelectorAll('.scm-ai-search-select-option'),
      ...this.sheet.querySelectorAll('.scm-ai-search-select-option'),
    ] as HTMLElement[]

    for (const option of allOptions) {
      option.addEventListener('click', (e) => {
        e.preventDefault()
        const value = option.getAttribute('data-value')!
        this.selectOption(value)
      })
    }
  }

  selectOption(value: string) {
    if (this.selectedValue === value) {
      this.selectedValue = null
      this.hiddenInput.value = ''
    } else {
      this.selectedValue = value
      this.hiddenInput.value = value
    }
    this.updateStyling()
  }

  updateStyling() {
    const selectedClass = 'scm-ai-search-select-selected'
    const hasSelected = this.selectedValue !== null
    this.smButton.classList.toggle(selectedClass, hasSelected)
    this.mdButton.classList.toggle(selectedClass, hasSelected)

    const option = this.options.find((opt) => opt.value === this.selectedValue)
    const text = option?.label ?? this.placeholder

    this.smButton.querySelector('span')!.textContent = text
    this.mdButton.querySelector('span')!.textContent = text

    const allOptions = [
      ...this.dropdown.querySelectorAll('.scm-ai-search-select-option'),
      ...this.sheet.querySelectorAll('.scm-ai-search-select-option'),
    ] as HTMLElement[]

    for (const option of allOptions) {
      const optionValue = option.getAttribute('data-value')
      option.classList.toggle('scm-ai-search-select-option-selected', optionValue === this.selectedValue)
    }
  }

  reset() {
    this.selectedValue = null
    this.hiddenInput.value = ''
    this.updateStyling()
  }
}

export class MultiSelect extends BaseSelect {
  inputs: HTMLInputElement[]
  hiddenInputsContainer: HTMLElement

  constructor(params: BaseSelectParams) {
    super(params)
    this.inputs = [
      ...this.form.querySelectorAll(`input[name="${this.name}-md"]`),
      ...this.form.querySelectorAll(`input[name="${this.name}-sm"]`),
    ] as HTMLInputElement[]
    this.hiddenInputsContainer = this.createHiddenInputsContainer()
    this.setup()
    this.subscribeToEvents()
  }

  private subscribeToEvents() {
    this.eventBus.on('form:reset', () => this.reset())
  }

  createHiddenInputsContainer(): HTMLElement {
    const container = document.createElement('div')
    container.style.display = 'none'
    this.form.appendChild(container)
    return container
  }

  setup() {
    this.setupSheet()
    this.setupDropdown()
    this.setupInputs()
    this.updateStyling()
  }

  setupInputs() {
    for (const input of this.inputs) {
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement
        this.syncInputs(target)
        this.updateStyling()
      })
    }
  }

  syncInputs(changedInput: HTMLInputElement) {
    const isChecked = changedInput.checked
    const value = changedInput.value

    const partnerInputs = this.inputs.filter((input) => input !== changedInput && input.value === value)
    for (const partnerInput of partnerInputs) {
      partnerInput.checked = isChecked
    }

    this.updateHiddenInputs()
  }

  updateHiddenInputs() {
    this.hiddenInputsContainer.innerHTML = ''

    const checkedInputs = [...this.form.querySelectorAll(`input[name="${this.name}-md"]:checked`)]
    for (const input of checkedInputs) {
      const hiddenInput = document.createElement('input')
      hiddenInput.type = 'hidden'
      hiddenInput.name = this.name
      hiddenInput.value = (input as HTMLInputElement).value
      this.hiddenInputsContainer.appendChild(hiddenInput)
    }
  }

  updateStyling() {
    const selectedClass = 'scm-ai-search-select-selected'
    const checkedInputs = [...this.form.querySelectorAll(`input[name="${this.name}-md"]:checked`)]
    const hasSelected = checkedInputs.length > 0

    this.smButton.classList.toggle(selectedClass, hasSelected)
    this.mdButton.classList.toggle(selectedClass, hasSelected)

    let text = this.placeholder

    if (checkedInputs.length > 0) {
      const values = [...checkedInputs].map((input) => (input as HTMLInputElement).value)
      const labels = values.map((value) => {
        const option = this.options.find((opt) => opt.value === value)
        return option?.label ?? value
      })
      text = labels.join('、')
    }

    this.smButton.querySelector('span')!.textContent = text
    this.mdButton.querySelector('span')!.textContent = text
  }

  reset() {
    for (const input of this.inputs) {
      input.checked = false
    }
    this.updateHiddenInputs()
    this.updateStyling()
  }
}
