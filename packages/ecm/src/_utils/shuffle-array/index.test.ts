import { describe, it, expect, vi } from 'vitest'
import { getRandom, shuffleArray } from '.'

describe('shuffle-array', () => {
  it('should shuffle the array', async () => {
    const mock = vi.fn((arr) => shuffleArray(arr))
    mock.mockReturnValue([3, 2, 1, 5, 4, 6])

    expect(mock([1, 2, 3, 4, 5, 6])).toMatchObject([3, 2, 1, 5, 4, 6])
  })

  it('should get random element', async () => {
    const mock = vi.fn((arr) => getRandom(arr))
    mock.mockReturnValue(3)

    expect(mock([1, 2, 3, 4, 5, 6])).toBe(3)
  })
})
