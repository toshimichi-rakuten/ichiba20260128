/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { LazyImageObserver } from './'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('Lazy Images', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <img data-lazy-loading="https://r.r10s.jp/com/img/thumb/logo/logo_rakuten_25th.svg" src="https://r.r10s.jp/com/img/home/t.gif" alt="" />
      </div>
    `
  })

  it('should be initialized without error', () => {
    expect(() => {
      new LazyImageObserver()
    }).not.toThrowError()
  })

  it('should setup IntersectionObserver', async () => {
    expect(window['IntersectionObserver']).toHaveBeenCalled()
  })

  // TODO
  it('should lazy load images')
})
