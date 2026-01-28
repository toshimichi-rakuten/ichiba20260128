/**
 * @vitest-environment jsdom
 */
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { Hover, ECM_MODULE_NAME } from '.'
import defaultHtml from './default.html?raw'
import { query } from '../../_utils'
import { ECM_MODULE_NAME_ATTRIBUTE } from '../../core/constants'

describe('Hover', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new Hover(element)
    }).not.toThrowError()
  })

  it('should open/close on mouse in/out', async () => {
    const hover = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    new Hover(hover)

    const mouseover = new Event('mouseover')
    const mouseout = new Event('mouseout')

    const trigger = query<HTMLButtonElement>(document).getElementsByAttribute('aria-expanded')[0]

    expect(hover.getAttribute('aria-hidden')).toBe('true')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    trigger.dispatchEvent(mouseover)
    vi.runAllTimers()

    expect(hover.getAttribute('aria-hidden')).toBe('false')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    trigger.dispatchEvent(mouseout)
    vi.runAllTimers()

    expect(hover.getAttribute('aria-hidden')).toBe('true')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})
