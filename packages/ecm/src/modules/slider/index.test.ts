/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { Slider, ECM_MODULE_NAME } from '.'
import { query } from '../../_utils'
import defaultHtml from './default.html?raw'

describe('Slider', () => {
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
      new Slider(element)
    }).not.toThrowError()
  })
})
