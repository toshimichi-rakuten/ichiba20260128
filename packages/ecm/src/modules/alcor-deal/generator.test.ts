/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { generateIntegration } from './generator'

// TODO: Improve test
describe('Alcor Deal Generator', () => {
  it('should generate', () => {
    const html = generateIntegration({
      endDate: 'true',
      badge: 'red',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    })

    expect(html).toMatchSnapshot()
  })
})
