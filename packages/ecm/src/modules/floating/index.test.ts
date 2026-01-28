/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { Floating, ECM_MODULE_NAME } from '.'
import defaultHtml from './default.html?raw'
import bodyLockHtml from './body_lock.html?raw'
import closeHtml from './close.html?raw'
import { query } from '../../_utils'
import { BodyLock } from '../body-lock'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('Floating', () => {
  const mock = vi.fn()

  beforeEach(() => {
    window.scrollTo = mock

    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Floating(element)
  })
})

describe('Floating Close', () => {
  const mock = vi.fn()

  beforeEach(() => {
    window.scrollTo = mock

    document.body.innerHTML = closeHtml
  })

  it('should close on click', async () => {
    const floating = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Floating(floating)

    const button = query<HTMLElement>(document).getElementsByAttribute('aria-controls')[0]

    expect(floating.getAttribute('aria-hidden')).toBe('false')

    button.click()

    expect(floating.getAttribute('aria-hidden')).toBe('true')
  })
})

describe('Floating Scroll', () => {
  beforeEach(() => {
    document.body.innerHTML = bodyLockHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Floating(element)
  })

  it('should not be visible until it passed data-show-at', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    Object.defineProperty(document.getElementById('show-floating'), 'offsetTop', {
      configurable: true,
      value: 600,
    })

    const floating = new Floating(element)
    expect(floating.hidden).toBe(true)

    window.scrollY = 700
    window.dispatchEvent(new Event('scroll'))
  })

  // ICW-20299 BodyLock disables page scrolling by adding `overflow: hidden;` to the body element.
  // This triggers a single tick of scroll event which causes Floating to trigger it's scroll event.

  // data-ignore-body-lock-scroll-event attribute allows us to ignore the scroll event.
  it('should ignore BodyLock scroll event', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    Object.defineProperty(document.getElementById('show-floating'), 'offsetTop', {
      configurable: true,
      value: 600,
    })

    const lock = BodyLock.singleton()
    const floating = new Floating(element)
    expect(floating.hidden).toBe(true)

    window.scrollY = 700
    window.dispatchEvent(new Event('scroll'))
    expect(floating.hidden).toBe(false)

    lock.set(true) // because calling lock() directly doesnt update `locked`
    window.scrollY = 0
    window.dispatchEvent(new Event('scroll'))
    expect(floating.hidden).toBe(false)
  })
})
