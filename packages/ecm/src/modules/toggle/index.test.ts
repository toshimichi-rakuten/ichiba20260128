/**
 * @vitest-environment jsdom
 */
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { Toggle, ECM_MODULE_NAME } from '.'
import defaultHtml from './default.html?raw'
import eventsHtml from './events.html?raw'
import { query } from '../../_utils'

describe('Toggle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new Toggle(element)
    }).not.toThrowError()
  })

  it('should open/close by trigger', async () => {
    const toggle = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Toggle(toggle)

    const trigger = query<HTMLButtonElement>(document).getElementsByAttribute('aria-expanded')[0]

    expect(toggle.getAttribute('aria-hidden')).toBe('true')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    trigger.click()
    vi.runAllTimers()

    expect(toggle.getAttribute('aria-hidden')).toBe('false')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    trigger.click()
    vi.runAllTimers()

    expect(toggle.getAttribute('aria-hidden')).toBe('true')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})

describe('Toggle Events', () => {
  beforeEach(() => {
    document.body.innerHTML = eventsHtml
  })

  it('should listen to open event', () => {
    const root = document.getElementById('toggle1')!
    const toggle = new Toggle(root)

    root.dispatchEvent(new Event('ecmToggleOpen'))
    expect(toggle.isOpen).toBe(true)
  })

  it('should listen to close event', () => {
    const root = document.getElementById('toggle1')!
    const toggle = new Toggle(root)
    toggle.isOpen = false

    root.dispatchEvent(new Event('ecmToggleClose'))
    expect(toggle.isOpen).toBe(false)
  })

  it('should listen to toggle event', () => {
    const root = document.getElementById('toggle1')!
    const toggle = new Toggle(root)

    root.dispatchEvent(new Event('ecmToggleToggle'))
    expect(toggle.isOpen).toBe(true)

    root.dispatchEvent(new Event('ecmToggleToggle'))
    expect(toggle.isOpen).toBe(false)

    root.dispatchEvent(new Event('ecmToggleToggle'))
    expect(toggle.isOpen).toBe(true)
  })
})
