/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { JsonpClient } from '.'

describe('JsonpClient', () => {
  it('should send get request', async () => {
    const client = new JsonpClient()

    expect(client.get('/')).toBeDefined()
  })
})
