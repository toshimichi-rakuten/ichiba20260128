/**
 * @vitest-environment jsdom
 */
import { describe, it, beforeEach, expect } from 'vitest'
import { Tab, ECM_MODULE_NAME } from '.'
import { query } from '../../_utils'
import defaultHtml from './default.html?raw'
import eventsHtml from './events.html?raw'
import nestedHtml from './nested.html?raw'

describe('Tab', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new Tab(element)
    }).not.toThrowError()
  })

  it('should switch tab on click', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Tab(element)

    const tabs = query<HTMLButtonElement>(document).getElementsByClassName('ecm-tab')
    const panels = query<HTMLElement>(document).getElementsByAttribute({
      role: 'tabpanel',
    })

    tabs[1].click()

    expect(tabs[1].getAttribute('aria-selected')).toBe('true')
    expect(panels[1].getAttribute('aria-hidden')).toBe('false')

    expect(tabs[0].getAttribute('aria-selected')).toBe('false')
    expect(panels[0].getAttribute('aria-hidden')).toBe('true')

    expect(tabs[2].getAttribute('aria-selected')).toBe('false')
    expect(panels[2].getAttribute('aria-hidden')).toBe('true')

    tabs[0].click()

    expect(tabs[0].getAttribute('aria-selected')).toBe('true')
    expect(panels[0].getAttribute('aria-hidden')).toBe('false')

    expect(tabs[1].getAttribute('aria-selected')).toBe('false')
    expect(panels[1].getAttribute('aria-hidden')).toBe('true')

    expect(tabs[2].getAttribute('aria-selected')).toBe('false')
    expect(panels[2].getAttribute('aria-hidden')).toBe('true')
  })
})

// TODO: Improve test
describe('Nested Tab', () => {
  beforeEach(() => {
    document.body.innerHTML = nestedHtml
  })

  it('should be initialized without error', () => {
    const elements = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })

    for (let el of elements) {
      expect(() => {
        new Tab(el)
      }).not.toThrowError()
    }
  })
})

describe('Tab Events', () => {
  beforeEach(() => {
    document.body.innerHTML = eventsHtml
  })

  it('should listen to custom event', () => {
    const root = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    const tab = new Tab(root)

    root.dispatchEvent(
      new CustomEvent('ecmTabSet', {
        detail: 'tabUnstyledPanel1',
      })
    )
    expect(tab.activeTabGroup.panel.getAttribute('id')).toBe('tabUnstyledPanel1')

    root.dispatchEvent(
      new CustomEvent('ecmTabSet', {
        detail: 'tabUnstyledPanel2',
      })
    )
    expect(tab.activeTabGroup.panel.getAttribute('id')).toBe('tabUnstyledPanel2')

    root.dispatchEvent(
      new CustomEvent('ecmTabSet', {
        detail: 'tabUnstyledPanel3',
      })
    )
    expect(tab.activeTabGroup.panel.getAttribute('id')).toBe('tabUnstyledPanel3')
  })
})
