/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { DUJSLoader } from './du-js-loader'
import { query } from '../_utils'
import couponHtml from '../modules/bookmark/default.html?raw'

describe('DU JS Loader', () => {
  it('should dynamically load DU JS', async () => {
    document.body.innerHTML = couponHtml

    DUJSLoader(() => {})

    expect(query<HTMLScriptElement>(document).getElements('script[src*="com/js/d/bookmark"]').length).toBeTruthy()
  })
})
