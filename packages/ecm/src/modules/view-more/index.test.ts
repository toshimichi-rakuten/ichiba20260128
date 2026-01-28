/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { ViewMore, ECM_MODULE_NAME } from '.'
import defaultHtml from './default.html?raw'
import closeSmoothHtml from './close-smooth.html?raw'
import { query } from '../../_utils'

describe('View More', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new ViewMore(element)
    }).not.toThrowError()
  })

  it('should open by trigger', async () => {
    const viewMore = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new ViewMore(viewMore)

    const trigger = query<HTMLButtonElement>(document).getElementsByAttribute('aria-controls')[0]

    expect(viewMore.children[2].getAttribute('aria-hidden')).toBe('true')

    expect(viewMore.children[3].getAttribute('aria-hidden')).toBe('true')

    expect(viewMore.children[4].getAttribute('aria-hidden')).toBe('true')

    trigger.click()

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(trigger.getAttribute('aria-hidden')).toBe('true')

    expect(viewMore.children[2].getAttribute('aria-hidden')).toBe('false')

    expect(viewMore.children[3].getAttribute('aria-hidden')).toBe('false')

    expect(viewMore.children[4].getAttribute('aria-hidden')).toBe('false')
  })
})

describe('View More Close Smooth', () => {
  const mock = vi.fn()

  beforeEach(() => {
    window.scrollTo = mock

    document.body.innerHTML = closeSmoothHtml
  })

  it('should be initialized without error', () => {
    const viewMore = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new ViewMore(viewMore)
    }).not.toThrowError()
  })

  it('should open/close smooth by trigger', async () => {
    const viewMore = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new ViewMore(viewMore)

    const openButton = query<HTMLButtonElement>(document)
      .getElementsByAttribute('aria-controls')
      .filter((el) => el.getAttribute('data-control-type') === 'open')[0]
    const closeButton = query<HTMLButtonElement>(document)
      .getElementsByAttribute('aria-controls')
      .filter((el) => el.getAttribute('data-control-type') === 'close')[0]

    expect(closeButton.getAttribute('data-scroll-on-click')).toBe('true')

    expect(viewMore.children[0].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[1].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[2].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[3].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[4].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[5].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[6].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[7].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[8].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[9].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[10].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[11].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[12].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[13].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[14].getAttribute('aria-hidden')).toBe('true')

    openButton.click()

    expect(openButton.getAttribute('aria-expanded')).toBe('true')
    expect(closeButton.getAttribute('aria-expanded')).toBe('true')
    expect(openButton.getAttribute('aria-hidden')).toBe('true')
    expect(closeButton.getAttribute('aria-hidden')).toBe('false')

    expect(viewMore.children[0].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[1].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[2].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[3].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[4].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[5].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[6].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[7].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[8].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[9].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[10].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[11].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[12].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[13].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[14].getAttribute('aria-hidden')).toBe('false')

    closeButton.click()

    expect(openButton.getAttribute('aria-expanded')).toBe('false')
    expect(closeButton.getAttribute('aria-expanded')).toBe('false')
    expect(openButton.getAttribute('aria-hidden')).toBe('false')
    expect(closeButton.getAttribute('aria-hidden')).toBe('true')

    expect(viewMore.children[0].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[1].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[2].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[3].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[4].getAttribute('aria-hidden')).toBe('false')
    expect(viewMore.children[5].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[6].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[7].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[8].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[9].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[10].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[11].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[12].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[13].getAttribute('aria-hidden')).toBe('true')
    expect(viewMore.children[14].getAttribute('aria-hidden')).toBe('true')

    const top = viewMore.getBoundingClientRect().top

    expect(mock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: Number(top) + Number(window.scrollY),
    })
  })
})
