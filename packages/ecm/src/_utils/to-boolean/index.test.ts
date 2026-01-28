import { describe, it, expect } from 'vitest'
import { toBoolean } from '.'

describe('toBoolean', () => {
  it('should convert "false" to false', () => {
    expect(toBoolean('false')).toBe(false)
  })

  it('should convert "0" to false', () => {
    expect(toBoolean('0')).toBe(false)
  })

  it('should convert falsy values to false', () => {
    expect(toBoolean('')).toBe(false)

    expect(toBoolean(0)).toBe(false)

    expect(toBoolean(null)).toBe(false)

    expect(toBoolean(undefined)).toBe(false)
  })

  it('should convert truthy to true', () => {
    expect(toBoolean(1)).toBe(true)

    expect(toBoolean('Hello')).toBe(true)

    expect(toBoolean('true')).toBe(true)

    expect(toBoolean({})).toBe(true)

    expect(toBoolean([])).toBe(true)
  })
})
