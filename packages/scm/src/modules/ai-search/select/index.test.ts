/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect } from 'vitest'
import { SingleSelect, MultiSelect, type SelectElements } from './index'
import { EventBus } from '../event-bus'

describe('SingleSelect', () => {
  let form: HTMLFormElement
  let elements: SelectElements
  let eventBus: EventBus

  function createMockElements(): SelectElements {
    form = document.createElement('form')

    const smButton = document.createElement('button')
    smButton.className = 'scm-ai-search-select-sm'
    smButton.setAttribute('data-filter-name', 'test')
    smButton.innerHTML = '<span>Select option</span><i></i>'

    const mdButton = document.createElement('button')
    mdButton.className = 'scm-ai-search-select-md'
    mdButton.setAttribute('data-filter-name', 'test')
    mdButton.innerHTML = '<span>Select option</span><i></i>'

    const dropdown = document.createElement('div')
    dropdown.id = 'ai-search-dropdown-test'
    dropdown.style.display = 'none'
    dropdown.innerHTML = `
      <div class="scm-ai-search-select-option" data-value="option1">Option 1</div>
      <div class="scm-ai-search-select-option" data-value="option2">Option 2</div>
    `

    const sheet = document.createElement('div')
    sheet.id = 'ai-search-sheet-test'
    sheet.setAttribute('aria-hidden', 'true')
    sheet.innerHTML = `
      <div class="scm-ai-search-select-option" data-value="option1">Option 1</div>
      <div class="scm-ai-search-select-option" data-value="option2">Option 2</div>
    `

    form.appendChild(smButton)
    form.appendChild(mdButton)
    form.appendChild(dropdown)
    form.appendChild(sheet)
    document.body.appendChild(form)

    return {
      form,
      smButton,
      mdButton,
      dropdown,
      sheet,
      smChevron: smButton.querySelector('i')!,
      mdChevron: mdButton.querySelector('i')!,
    }
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    eventBus = new EventBus()
  })

  it('should initialize without error', () => {
    elements = createMockElements()

    expect(() => {
      new SingleSelect({
        name: 'test',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        placeholder: 'Select option',
        els: elements,
        eventBus,
      })
    }).not.toThrow()
  })

  it('should create hidden input for form submission', () => {
    elements = createMockElements()

    new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    const hiddenInput = form.querySelector('input[type="hidden"][name="test"]')
    expect(hiddenInput).not.toBeNull()
  })

  it('should select option when clicked', () => {
    elements = createMockElements()

    const select = new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    const option = elements.dropdown.querySelector('[data-value="option1"]') as HTMLElement
    option.click()

    expect(select.selectedValue).toBe('option1')
    expect(select.hiddenInput.value).toBe('option1')
  })

  it('should deselect option when clicked again', () => {
    elements = createMockElements()

    const select = new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    const option = elements.dropdown.querySelector('[data-value="option1"]') as HTMLElement
    option.click()
    option.click()

    expect(select.selectedValue).toBeNull()
    expect(select.hiddenInput.value).toBe('')
  })

  it('should update button text when option is selected', () => {
    elements = createMockElements()

    new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    const option = elements.dropdown.querySelector('[data-value="option1"]') as HTMLElement
    option.click()

    expect(elements.smButton.querySelector('span')?.textContent).toBe('Option 1')
    expect(elements.mdButton.querySelector('span')?.textContent).toBe('Option 1')
  })

  it('should reset to placeholder when form:reset event is emitted', () => {
    elements = createMockElements()

    const select = new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    const option = elements.dropdown.querySelector('[data-value="option1"]') as HTMLElement
    option.click()

    eventBus.emit('form:reset')

    expect(select.selectedValue).toBeNull()
    expect(select.hiddenInput.value).toBe('')
    expect(elements.smButton.querySelector('span')?.textContent).toBe('Select option')
  })

  it('should toggle dropdown when mdButton is clicked', () => {
    elements = createMockElements()

    new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    elements.mdButton.click()
    expect(elements.dropdown.style.display).toBe('block')

    elements.mdButton.click()
    expect(elements.dropdown.style.display).toBe('none')
  })

  it('should apply selected class to button when option is selected', () => {
    elements = createMockElements()

    new SingleSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select option',
      els: elements,
      eventBus,
    })

    const option = elements.dropdown.querySelector('[data-value="option1"]') as HTMLElement
    option.click()

    expect(elements.smButton.classList.contains('scm-ai-search-select-selected')).toBe(true)
    expect(elements.mdButton.classList.contains('scm-ai-search-select-selected')).toBe(true)
  })
})

describe('MultiSelect', () => {
  let form: HTMLFormElement
  let elements: SelectElements
  let eventBus: EventBus

  function createMockElements(): SelectElements {
    form = document.createElement('form')

    const smButton = document.createElement('button')
    smButton.className = 'scm-ai-search-select-sm'
    smButton.setAttribute('data-filter-name', 'test')
    smButton.innerHTML = '<span>Select options</span><i></i>'

    const mdButton = document.createElement('button')
    mdButton.className = 'scm-ai-search-select-md'
    mdButton.setAttribute('data-filter-name', 'test')
    mdButton.innerHTML = '<span>Select options</span><i></i>'

    const dropdown = document.createElement('div')
    dropdown.id = 'ai-search-dropdown-test'
    dropdown.style.display = 'none'
    dropdown.innerHTML = `
      <label><input type="checkbox" name="test-md" value="option1"> Option 1</label>
      <label><input type="checkbox" name="test-md" value="option2"> Option 2</label>
    `

    const sheet = document.createElement('div')
    sheet.id = 'ai-search-sheet-test'
    sheet.setAttribute('aria-hidden', 'true')
    sheet.innerHTML = `
      <label><input type="checkbox" name="test-sm" value="option1"> Option 1</label>
      <label><input type="checkbox" name="test-sm" value="option2"> Option 2</label>
    `

    form.appendChild(smButton)
    form.appendChild(mdButton)
    form.appendChild(dropdown)
    form.appendChild(sheet)
    document.body.appendChild(form)

    return {
      form,
      smButton,
      mdButton,
      dropdown,
      sheet,
      smChevron: smButton.querySelector('i')!,
      mdChevron: mdButton.querySelector('i')!,
    }
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    eventBus = new EventBus()
  })

  it('should initialize without error', () => {
    elements = createMockElements()

    expect(() => {
      new MultiSelect({
        name: 'test',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        placeholder: 'Select options',
        els: elements,
        eventBus,
      })
    }).not.toThrow()
  })

  it('should sync checkboxes between mobile and desktop', () => {
    elements = createMockElements()

    new MultiSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select options',
      els: elements,
      eventBus,
    })

    const mdCheckbox = elements.dropdown.querySelector('input[value="option1"]') as HTMLInputElement
    mdCheckbox.checked = true
    mdCheckbox.dispatchEvent(new Event('change'))

    const smCheckbox = elements.sheet.querySelector('input[value="option1"]') as HTMLInputElement
    expect(smCheckbox.checked).toBe(true)
  })

  it('should create hidden inputs for checked options', () => {
    elements = createMockElements()

    new MultiSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select options',
      els: elements,
      eventBus,
    })

    const mdCheckbox = elements.dropdown.querySelector('input[value="option1"]') as HTMLInputElement
    mdCheckbox.checked = true
    mdCheckbox.dispatchEvent(new Event('change'))

    const hiddenInputs = form.querySelectorAll('input[type="hidden"][name="test"]')
    expect(hiddenInputs.length).toBe(1)
    expect((hiddenInputs[0] as HTMLInputElement).value).toBe('option1')
  })

  it('should update button text with selected option labels', () => {
    elements = createMockElements()

    new MultiSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select options',
      els: elements,
      eventBus,
    })

    const checkbox1 = elements.dropdown.querySelector('input[value="option1"]') as HTMLInputElement
    checkbox1.checked = true
    checkbox1.dispatchEvent(new Event('change'))

    expect(elements.smButton.querySelector('span')?.textContent).toBe('Option 1')

    const checkbox2 = elements.dropdown.querySelector('input[value="option2"]') as HTMLInputElement
    checkbox2.checked = true
    checkbox2.dispatchEvent(new Event('change'))

    expect(elements.smButton.querySelector('span')?.textContent).toBe('Option 1、Option 2')
  })

  it('should reset all checkboxes on form:reset event', () => {
    elements = createMockElements()

    new MultiSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select options',
      els: elements,
      eventBus,
    })

    const checkbox = elements.dropdown.querySelector('input[value="option1"]') as HTMLInputElement
    checkbox.checked = true
    checkbox.dispatchEvent(new Event('change'))

    eventBus.emit('form:reset')

    const allCheckboxes = [...form.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[]
    for (const cb of allCheckboxes) {
      expect(cb.checked).toBe(false)
    }
  })

  it('should apply selected class when options are checked', () => {
    elements = createMockElements()

    new MultiSelect({
      name: 'test',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      placeholder: 'Select options',
      els: elements,
      eventBus,
    })

    const checkbox = elements.dropdown.querySelector('input[value="option1"]') as HTMLInputElement
    checkbox.checked = true
    checkbox.dispatchEvent(new Event('change'))

    expect(elements.smButton.classList.contains('scm-ai-search-select-selected')).toBe(true)
    expect(elements.mdButton.classList.contains('scm-ai-search-select-selected')).toBe(true)
  })
})
