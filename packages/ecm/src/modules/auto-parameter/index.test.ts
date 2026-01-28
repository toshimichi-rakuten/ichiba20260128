/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, it, expect } from 'vitest'
import { query } from '../../_utils'
import defaultHtml from './default.html?raw'
import { AutoParameter, ECM_MODULE_NAME } from './'

describe('AutoParameter', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new AutoParameter(element, null)
    expect(() => {
      new AutoParameter(element, null)
    }).not.toThrowError()
  })
})
