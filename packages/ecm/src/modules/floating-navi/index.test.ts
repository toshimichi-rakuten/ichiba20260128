/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { FloatingNavi, ECM_MODULE_NAME } from '.'
import defaultHtml from './default.html?raw'
import { query } from '../../_utils'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe('Floating Navi', () => {
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
      new FloatingNavi(element)
    }).not.toThrowError()
  })
})
