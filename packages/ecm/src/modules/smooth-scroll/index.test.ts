/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { SmoothScroll, ECM_MODULE_NAME } from '.'
import { query } from '../../_utils'
import defaultHtml from './default.html?raw'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('smooth-scroll', () => {
  const mock = vi.fn()

  beforeEach(() => {
    window.scrollTo = mock
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new SmoothScroll(element)
    }).not.toThrowError()
  })

  it('should scroll to target', async () => {
    const button = query<HTMLElement>(document).getElementsByTagName('a')[0]
    new SmoothScroll(button)

    button.click()

    expect(mock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    })
  })

  it('should not add # in url', async () => {
    const button = query<HTMLElement>(document).getElementsByTagName('a')[0]
    new SmoothScroll(button)

    button.click()

    expect(window.location.href.includes('#')).toBe(false)
  })
})
