/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { debounce } from '.'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should debounce function', async () => {
    const mock = vi.fn(() => console.log('executed'))
    const debounced = debounce(mock)

    debounced()
    debounced()
    debounced()

    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)

    debounced()
    vi.runAllTimers()
    debounced()
    vi.runAllTimers()

    expect(mock).toHaveBeenCalledTimes(3)
  })
})
