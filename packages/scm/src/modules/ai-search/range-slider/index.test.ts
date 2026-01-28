/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect } from 'vitest'
import { RangeSlider, type RangeSliderElements, type RangeSliderSettings } from './index'
import { EventBus } from '../event-bus'

describe('RangeSlider', () => {
  let elements: RangeSliderElements
  let settings: RangeSliderSettings
  let eventBus: EventBus

  function createMockElements(): RangeSliderElements {
    const fromSlider = document.createElement('input')
    fromSlider.type = 'range'
    fromSlider.min = '0'
    fromSlider.max = '10000'
    fromSlider.value = '0'
    fromSlider.step = '1000'
    fromSlider.setAttribute('data-scm-search-ai-range-slider-from-slider', '')

    const toSlider = document.createElement('input')
    toSlider.type = 'range'
    toSlider.min = '0'
    toSlider.max = '10000'
    toSlider.value = '10000'
    toSlider.step = '1000'
    toSlider.setAttribute('data-scm-search-ai-range-slider-to-slider', '')

    const fromThumb = document.createElement('div')
    fromThumb.className = 'scm-search-ai-range-slider-from-thumb'

    const toThumb = document.createElement('div')
    toThumb.className = 'scm-search-ai-range-slider-to-thumb'

    const fromBubble = document.createElement('div')
    fromBubble.className = 'scm-search-ai-range-slider-from-bubble'

    const toBubble = document.createElement('div')
    toBubble.className = 'scm-search-ai-range-slider-to-bubble'

    const combinedBubble = document.createElement('div')
    combinedBubble.className = 'scm-search-ai-range-slider-combined-bubble'

    const fromValueBubble = document.createElement('span')
    fromValueBubble.setAttribute('data-scm-search-ai-range-slider-from-value-bubble', '')

    const toValueBubble = document.createElement('span')
    toValueBubble.setAttribute('data-scm-search-ai-range-slider-to-value-bubble', '')

    const fromValueCombined = document.createElement('span')
    fromValueCombined.setAttribute('data-scm-search-ai-range-slider-from-value-combined', '')

    const toValueCombined = document.createElement('span')
    toValueCombined.setAttribute('data-scm-search-ai-range-slider-to-value-combined', '')

    document.body.appendChild(fromSlider)
    document.body.appendChild(toSlider)
    document.body.appendChild(fromThumb)
    document.body.appendChild(toThumb)
    document.body.appendChild(fromBubble)
    document.body.appendChild(toBubble)
    document.body.appendChild(combinedBubble)
    fromBubble.appendChild(fromValueBubble)
    toBubble.appendChild(toValueBubble)
    combinedBubble.appendChild(fromValueCombined)
    combinedBubble.appendChild(toValueCombined)

    return {
      fromSlider,
      toSlider,
      fromThumb,
      toThumb,
      fromBubble,
      toBubble,
      combinedBubble,
      fromValueBubble,
      toValueBubble,
      fromValueCombined,
      toValueCombined,
    }
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    document.documentElement.style.setProperty('--scm-ai-search-theme-color', '#ff0000')
    document.documentElement.style.setProperty('--scm-ai-search-track-color', '#cccccc')

    elements = createMockElements()
    settings = {
      currencyText: ' yen',
      noLowerLimitText: 'No minimum',
      noUpperLimitText: 'No maximum',
    }
    eventBus = new EventBus()
  })

  it('should initialize without error', () => {
    expect(() => {
      new RangeSlider({ els: elements, settings, eventBus })
    }).not.toThrow()
  })

  it('should set initial values from sliders', () => {
    const rangeSlider = new RangeSlider({ els: elements, settings, eventBus })

    expect(rangeSlider.minValue).toBe(0)
    expect(rangeSlider.maxValue).toBe(10000)
  })

  it('should format min value with noLowerLimitText', () => {
    elements.fromSlider.value = '0'
    new RangeSlider({ els: elements, settings, eventBus })

    expect(elements.fromValueBubble.textContent).toBe('No minimum')
  })

  it('should format max value with noUpperLimitText', () => {
    elements.toSlider.value = '10000'
    new RangeSlider({ els: elements, settings, eventBus })

    expect(elements.toValueBubble.textContent).toBe('No maximum')
  })

  it('should format middle values with currency text', () => {
    elements.fromSlider.value = '1000'
    elements.toSlider.value = '5000'
    new RangeSlider({ els: elements, settings, eventBus })

    expect(elements.fromValueBubble.textContent).toBe('1,000 yen')
    expect(elements.toValueBubble.textContent).toBe('5,000 yen')
  })

  it('should update display when fromSlider changes', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.fromSlider.value = '2000'
    elements.fromSlider.dispatchEvent(new Event('input'))

    expect(elements.fromValueBubble.textContent).toBe('2,000 yen')
  })

  it('should update display when toSlider changes', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.toSlider.value = '8000'
    elements.toSlider.dispatchEvent(new Event('input'))

    expect(elements.toValueBubble.textContent).toBe('8,000 yen')
  })

  it('should prevent fromSlider from exceeding toSlider', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.toSlider.value = '3000'
    elements.fromSlider.value = '5000'
    elements.fromSlider.dispatchEvent(new Event('input'))

    expect(Number(elements.fromSlider.value)).toBeLessThan(Number(elements.toSlider.value))
  })

  it('should prevent toSlider from going below fromSlider', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.fromSlider.value = '5000'
    elements.toSlider.value = '3000'
    elements.toSlider.dispatchEvent(new Event('input'))

    expect(Number(elements.toSlider.value)).toBeGreaterThan(Number(elements.fromSlider.value))
  })

  it('should show combined bubble when thumbs are close', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.fromSlider.value = '5000'
    elements.toSlider.value = '6000'
    elements.fromSlider.dispatchEvent(new Event('input'))

    expect(elements.combinedBubble.style.display).toBe('block')
    expect(elements.fromBubble.style.display).toBe('none')
    expect(elements.toBubble.style.display).toBe('none')
  })

  it('should show separate bubbles when thumbs are far apart', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.fromSlider.value = '1000'
    elements.toSlider.value = '9000'
    elements.fromSlider.dispatchEvent(new Event('input'))

    expect(elements.fromBubble.style.display).toBe('block')
    expect(elements.toBubble.style.display).toBe('block')
    expect(elements.combinedBubble.style.display).toBe('none')
  })

  it('should reset to initial values on form:reset event', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.fromSlider.value = '3000'
    elements.toSlider.value = '7000'
    elements.fromSlider.dispatchEvent(new Event('input'))

    eventBus.emit('form:reset')

    expect(elements.fromSlider.value).toBe('0')
    expect(elements.toSlider.value).toBe('10000')
  })

  it('should update thumb positions based on slider values', () => {
    new RangeSlider({ els: elements, settings, eventBus })

    elements.fromSlider.value = '5000'
    elements.fromSlider.dispatchEvent(new Event('input'))

    expect(elements.fromThumb.style.left).toBe('50%')
  })

  it('should set input value attributes', () => {
    elements.fromSlider.value = '2000'
    elements.toSlider.value = '8000'
    new RangeSlider({ els: elements, settings, eventBus })

    expect(elements.fromSlider.getAttribute('value')).toBe('2000')
    expect(elements.toSlider.getAttribute('value')).toBe('8000')
  })
})
