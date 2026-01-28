import { sendRATCustomEvent } from '../rat'
import type { EventBus } from '../event-bus'

export type RangeSliderSettings = {
  currencyText: string
  noLowerLimitText: string
  noUpperLimitText: string
}

export type RangeSliderElements = {
  fromSlider: HTMLInputElement
  toSlider: HTMLInputElement
  fromThumb: HTMLElement
  toThumb: HTMLElement
  fromBubble: HTMLElement
  toBubble: HTMLElement
  combinedBubble: HTMLElement
  fromValueBubble: HTMLSpanElement
  toValueBubble: HTMLSpanElement
  fromValueCombined: HTMLSpanElement
  toValueCombined: HTMLSpanElement
}

type RangeSliderParams = {
  els: RangeSliderElements
  settings: RangeSliderSettings
  eventBus: EventBus
}

const COMBINED_BUBBLE_THRESHOLD = 25

export class RangeSlider {
  fromSlider: HTMLInputElement
  toSlider: HTMLInputElement
  fromThumb: HTMLElement
  toThumb: HTMLElement
  fromBubble: HTMLElement
  toBubble: HTMLElement
  combinedBubble: HTMLElement
  fromValueBubble: HTMLSpanElement
  toValueBubble: HTMLSpanElement
  fromValueCombined: HTMLSpanElement
  toValueCombined: HTMLSpanElement
  maxValue: number
  minValue: number
  settings: RangeSliderSettings
  eventBus: EventBus
  private isFromDragging: boolean = false
  private isToDragging: boolean = false
  private debounceTimer: ReturnType<typeof setTimeout> | null = null

  constructor({ els, settings, eventBus }: RangeSliderParams) {
    this.settings = settings
    this.eventBus = eventBus
    this.fromSlider = els.fromSlider
    this.toSlider = els.toSlider
    this.fromThumb = els.fromThumb
    this.toThumb = els.toThumb
    this.fromBubble = els.fromBubble
    this.toBubble = els.toBubble
    this.combinedBubble = els.combinedBubble
    this.fromValueBubble = els.fromValueBubble
    this.toValueBubble = els.toValueBubble
    this.fromValueCombined = els.fromValueCombined
    this.toValueCombined = els.toValueCombined

    this.maxValue = Number(els.toSlider.getAttribute('max'))
    this.minValue = Number(els.fromSlider.getAttribute('min'))

    this.updateDisplay()
    this.setupEventListeners()
    this.subscribeToEvents()
  }

  private subscribeToEvents() {
    this.eventBus.on('form:reset', () => this.reset())
  }

  private updateDisplay() {
    this.fillSlider()
    this.setSpanValue()
    this.updateThumbPositions()
    this.updateInputValues()
  }

  private setupEventListeners() {
    this.fromSlider.addEventListener('input', () => this.handleFromSliderChange())
    this.fromSlider.addEventListener('touchstart', () => this.handleFromSliderChange())
    this.fromSlider.addEventListener('touchmove', () => this.handleFromSliderChange())
    this.toSlider.addEventListener('input', () => this.handleToSliderChange())
    this.toSlider.addEventListener('touchstart', () => this.handleToSliderChange())
    this.toSlider.addEventListener('touchmove', () => this.handleToSliderChange())
    this.setupThumbDragging()
  }

  private getParsedValues(): [number, number] {
    const from = parseInt(this.fromSlider.value, 10)
    const to = parseInt(this.toSlider.value, 10)
    return [from, to]
  }

  private fillSlider() {
    const min = parseInt(this.fromSlider.min, 10)
    const max = parseInt(this.toSlider.max, 10)
    const rangeDistance = max - min
    const [from, to] = this.getParsedValues()
    const fromPosition = from - min
    const toPosition = to - min

    const fromPercent = (fromPosition / rangeDistance) * 100
    const toPercent = (toPosition / rangeDistance) * 100
    const themeColor = this.getThemeColor()
    const trackColor = this.getTrackColor()

    this.toSlider.style.background = `
      linear-gradient(
        to right,
        ${trackColor} 0%,
        ${trackColor} ${fromPercent}%,
        ${themeColor} ${fromPercent}%,
        ${themeColor} ${toPercent}%,
        ${trackColor} ${toPercent}%,
        ${trackColor} 100%
      )`
  }

  private handleFromSliderChange() {
    const [from, to] = this.getParsedValues()
    const max = parseInt(this.toSlider.max, 10)
    const step = parseInt(this.fromSlider.step, 10)

    if (from >= max) {
      this.fromSlider.value = (max - step).toString()
    } else if (from >= to) {
      this.fromSlider.value = (to - step).toString()
    }

    this.updateDisplay()

    const valueText = Number(this.fromSlider.value) === this.minValue ? 'min' : this.fromSlider.value

    this.sendRATEventForSlider(this.fromSlider, valueText)
  }

  private handleToSliderChange() {
    const [from, to] = this.getParsedValues()
    const min = parseInt(this.fromSlider.min, 10)
    const step = parseInt(this.toSlider.step, 10)

    if (to <= min) {
      this.toSlider.value = (min + step).toString()
    } else if (to <= from) {
      this.toSlider.value = (from + step).toString()
    }

    this.updateDisplay()

    const valueText = Number(this.toSlider.value) === this.maxValue ? 'max' : this.toSlider.value

    this.sendRATEventForSlider(this.toSlider, valueText)
  }

  private setSpanValue() {
    const [from, to] = this.getParsedValues()
    const fromText = this.formatValue(from)
    const toText = this.formatValue(to)

    this.fromValueBubble.textContent = fromText
    this.toValueBubble.textContent = toText
    this.fromValueCombined.textContent = fromText
    this.toValueCombined.textContent = toText
  }

  private formatValue(value: number): string {
    const formattedValue = value.toLocaleString('en-US')
    const { noLowerLimitText, noUpperLimitText, currencyText } = this.settings

    if (value === 0) {
      return noLowerLimitText
    }

    if (value === this.maxValue) {
      return noUpperLimitText
    }

    return `${formattedValue}${currencyText}`
  }

  private updateThumbPositions() {
    const [from, to] = this.getParsedValues()
    const fromPercent = (from / this.maxValue) * 100
    const toPercent = (to / this.maxValue) * 100

    this.fromThumb.style.left = `${fromPercent}%`
    this.toThumb.style.left = `${toPercent}%`

    this.updateBubbleVisibility(fromPercent, toPercent)
  }

  private updateBubbleVisibility(fromPercent: number, toPercent: number) {
    const thumbDistance = Math.abs(toPercent - fromPercent)
    const shouldShowCombined = thumbDistance < COMBINED_BUBBLE_THRESHOLD

    if (shouldShowCombined) {
      this.fromBubble.style.display = 'none'
      this.toBubble.style.display = 'none'
      this.combinedBubble.style.display = 'block'
      this.combinedBubble.style.left = `${(fromPercent + toPercent) / 2}%`
    } else {
      this.fromBubble.style.display = 'block'
      this.toBubble.style.display = 'block'
      this.combinedBubble.style.display = 'none'
    }
  }

  private updateInputValues() {
    const [from, to] = this.getParsedValues()
    this.fromSlider.setAttribute('value', from.toString())
    this.toSlider.setAttribute('value', to.toString())
  }

  private setupThumbDragging() {
    this.setupThumbDrag(this.fromThumb, this.fromSlider, 'from')
    this.setupThumbDrag(this.toThumb, this.toSlider, 'to')
  }

  private setupThumbDrag(thumb: HTMLElement, slider: HTMLInputElement, type: 'from' | 'to') {
    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (type === 'from') {
        this.isFromDragging = true
      } else {
        this.isToDragging = true
      }
      e.preventDefault()
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const isDragging = type === 'from' ? this.isFromDragging : this.isToDragging
      if (!isDragging) {
        return
      }

      const rect = slider.getBoundingClientRect()
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const rawValue = percent * Number(slider.max)
      const step = Number(slider.step)
      let value = Math.round(rawValue / step) * step

      if (type === 'from') {
        const toValue = Number(this.toSlider.value)
        value = Math.min(value, toValue - step)
      } else {
        const fromValue = Number(this.fromSlider.value)
        value = Math.max(value, fromValue + step)
      }

      slider.value = value.toString()
      slider.dispatchEvent(new Event('input'))
    }

    const handleEnd = () => {
      if (type === 'from') {
        this.isFromDragging = false
      } else {
        this.isToDragging = false
      }
    }

    thumb.addEventListener('mousedown', handleStart)
    thumb.addEventListener('touchstart', handleStart)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchend', handleEnd)
  }

  private getThemeColor(): string {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--scm-ai-search-theme-color').trim()
    if (!themeColor) {
      throw new Error('themeColor is not defined')
    }

    return themeColor
  }

  private getTrackColor(): string {
    const trackColor = getComputedStyle(document.documentElement).getPropertyValue('--scm-ai-search-track-color').trim()
    if (!trackColor) {
      throw new Error('trackColor is not defined')
    }

    return trackColor
  }

  private sendRATEventForSlider(slider: HTMLInputElement, value: string) {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }

    this.debounceTimer = setTimeout(() => {
      const ratEventId = slider.getAttribute('data-rat-custom-event-id')
      if (!ratEventId) {
        return
      }

      const eventType = slider.getAttribute('data-rat-custom-event-type')
      if (!eventType) {
        return
      }

      const fullEventId = `${ratEventId}_${value}`
      sendRATCustomEvent(fullEventId, eventType)
    }, 300)
  }

  reset() {
    this.fromSlider.value = this.fromSlider.min
    this.toSlider.value = this.toSlider.max
    this.updateDisplay()
  }
}
