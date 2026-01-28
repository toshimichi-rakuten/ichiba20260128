/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ScrollToTop, ECM_MODULE_NAME } from '.'
import { query } from '../../_utils'
import defaultHtml from './default.html?raw'

describe('ScrollToTop', () => {
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
      new ScrollToTop(element)
    }).not.toThrowError()
  })

  it('should scroll to top on click', async () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new ScrollToTop(element)

    query<HTMLInputElement>(document).getElementsByTagName('button')[0].click()

    expect(mock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    })
  })
})
