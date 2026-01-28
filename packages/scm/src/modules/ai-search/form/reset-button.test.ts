/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { ResetButton } from './reset-button'
import { EventBus } from '../event-bus'

describe('ResetButton', () => {
  let button: HTMLButtonElement
  let eventBus: EventBus

  beforeEach(() => {
    button = document.createElement('button')
    button.className = 'scm-ai-search-submit-reset-button'
    document.body.appendChild(button)
    eventBus = new EventBus()
  })

  it('should initialize without error', () => {
    expect(() => {
      new ResetButton(button, eventBus)
    }).not.toThrow()
  })

  it('should emit form:reset event when clicked', () => {
    const handler = vi.fn()
    eventBus.on('form:reset', handler)

    new ResetButton(button, eventBus)
    button.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should emit form:reset event multiple times on multiple clicks', () => {
    const handler = vi.fn()
    eventBus.on('form:reset', handler)

    new ResetButton(button, eventBus)
    button.click()
    button.click()
    button.click()

    expect(handler).toHaveBeenCalledTimes(3)
  })
})
