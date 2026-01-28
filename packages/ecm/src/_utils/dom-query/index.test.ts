import { describe, it, beforeEach, expect } from 'vitest'
import { query } from '.'

/**
 * @vitest-environment jsdom
 */
describe('query', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div>
      <div class="test"></div>
      <div data-module-name="ecm-test"></div>
      <a>anchor 1</a>
      <a>anchor 1</a>
    </div>
    `
  })

  it('should get elements by any selector', async () => {
    expect(query<HTMLElement>(document).getElements('.test').length).toBe(1)
  })

  it('should get elements by class', async () => {
    expect(query<HTMLElement>(document).getElementsByClassName('test').length).toBe(1)
  })

  it('should get elements by attribute', async () => {
    expect(
      query<HTMLElement>(document).getElementsByAttribute({
        'data-module-name': 'ecm-test',
      }).length
    ).toBe(1)

    expect(query<HTMLElement>(document).getElementsByAttribute('data-module-name').length).toBe(1)
  })

  it('should get elements by tag', async () => {
    expect(query<HTMLElement>(document).getElementsByTagName('a').length).toBe(2)
  })
})
