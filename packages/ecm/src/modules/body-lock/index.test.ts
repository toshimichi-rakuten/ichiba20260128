/**
 * @vitest-environment jsdom
 */
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { BodyLock } from '.'
import eventsHtml from './events.html?raw'

describe('BodyLock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.style.position = 'relative'
    document.body.style.top = '10px'
    document.documentElement.scrollTop = 300
  })

  it('should toggle body lock', () => {
    const bodyLock = BodyLock.singleton()

    bodyLock.set(true)
    vi.runAllTimers()

    expect(document.body.style.position).toBe('fixed')
    expect(document.body.style.overflowX).toBe('hidden')
    expect(document.body.style.overflowY).toBe('scroll')
    expect(document.body.style.overflowY).toBe('scroll')
    expect(document.body.style.top).toBe('-300px')
    expect(document.documentElement.scrollTop).toBe(300)

    bodyLock.set(false)
    vi.runAllTimers()

    expect(document.body.style.position).toBe('relative')
    expect(document.body.style.overflowX).toBe('')
    expect(document.body.style.overflowY).toBe('')
    expect(document.body.style.top).toBe('10px')
    expect(document.documentElement.scrollTop).toBe(300)
  })
})

describe('BodyLock Events', () => {
  beforeEach(() => {
    document.body.innerHTML = eventsHtml
  })

  it('should listen to lock event', () => {
    const root = document.querySelector('body')!
    const toggle = BodyLock.singleton()

    root.dispatchEvent(new Event('ecmBodyLockLock'))
    expect(toggle.locked).toBe(true)
  })

  it('should listen to unlock event', () => {
    const root = document.querySelector('body')!
    const toggle = BodyLock.singleton()
    toggle.locked = false

    root.dispatchEvent(new Event('ecmBodyLockUnlock'))
    expect(toggle.locked).toBe(false)
  })

  it('should listen to toggle event', () => {
    const root = document.querySelector('body')!
    const toggle = BodyLock.singleton()

    root.dispatchEvent(new Event('ecmBodyLockToggle'))
    expect(toggle.locked).toBe(true)

    root.dispatchEvent(new Event('ecmBodyLockToggle'))
    expect(toggle.locked).toBe(false)

    root.dispatchEvent(new Event('ecmBodyLockToggle'))
    expect(toggle.locked).toBe(true)
  })
})
