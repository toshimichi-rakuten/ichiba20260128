/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect } from 'vitest'
import { getCookie } from '.'

describe('getCookie', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'property=chocolate; property2=vanilla',
    })
  })

  it('should retrieve cookie', async () => {
    expect(getCookie()).toMatchObject({
      property: 'chocolate',
      property2: 'vanilla',
    })
  })
})
