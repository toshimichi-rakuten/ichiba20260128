/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect } from 'vitest'
import { Accordion, ECM_MODULE_NAME } from '.'
import unstyledHtml from './unstyled.html?raw'
import eventsHtml from './events.html?raw'
import mdDisabledHtml from './md-disabled.html?raw'
import { query } from '../../_utils'

describe('Accordion', () => {
  beforeEach(() => {
    sessionStorage.clear()
    document.body.innerHTML = unstyledHtml
  })

  it('should be initialized without error', () => {
    const accordions = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })

    for (let accordion of accordions) {
      expect(() => {
        new Accordion(accordion)
      }).not.toThrowError()
    }
  })

  it('should open accordion [single]', () => {
    const single = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Accordion(single)

    const triggers = query<HTMLElement>(single).getElementsByAttribute('aria-controls')
    const panels = query<HTMLElement>(single).getElementsByAttribute('aria-labelledby')

    triggers[1].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('false')

    expect(panels[0].getAttribute('aria-hidden')).toBe('true')
    expect(panels[1].getAttribute('aria-hidden')).toBe('false')
    expect(panels[2].getAttribute('aria-hidden')).toBe('true')

    triggers[0].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('false')

    expect(panels[0].getAttribute('aria-hidden')).toBe('false')
    expect(panels[1].getAttribute('aria-hidden')).toBe('true')
    expect(panels[2].getAttribute('aria-hidden')).toBe('true')

    triggers[2].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('true')

    expect(panels[0].getAttribute('aria-hidden')).toBe('true')
    expect(panels[1].getAttribute('aria-hidden')).toBe('true')
    expect(panels[2].getAttribute('aria-hidden')).toBe('false')
  })

  it('should open accordion [multiple]', () => {
    const multiple = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[1]

    new Accordion(multiple)

    const triggers = query<HTMLElement>(multiple).getElementsByAttribute('aria-controls')
    const panels = query<HTMLElement>(multiple).getElementsByAttribute('aria-labelledby')

    triggers[1].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('false')

    expect(panels[0].getAttribute('aria-hidden')).toBe('true')
    expect(panels[1].getAttribute('aria-hidden')).toBe('false')
    expect(panels[2].getAttribute('aria-hidden')).toBe('true')

    triggers[0].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('false')

    expect(panels[0].getAttribute('aria-hidden')).toBe('false')
    expect(panels[1].getAttribute('aria-hidden')).toBe('false')
    expect(panels[2].getAttribute('aria-hidden')).toBe('true')

    triggers[2].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('true')

    expect(panels[0].getAttribute('aria-hidden')).toBe('false')
    expect(panels[1].getAttribute('aria-hidden')).toBe('false')
    expect(panels[2].getAttribute('aria-hidden')).toBe('false')

    triggers[1].click()

    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('true')

    expect(panels[0].getAttribute('aria-hidden')).toBe('false')
    expect(panels[1].getAttribute('aria-hidden')).toBe('true')
    expect(panels[2].getAttribute('aria-hidden')).toBe('false')
  })
})

describe('Accordion [disabled]', () => {
  beforeEach(() => {
    document.body.innerHTML = mdDisabledHtml
    sessionStorage.clear()
  })

  it('gets disabled on md', () => {
    global.innerWidth = 768

    const accordion = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Accordion(accordion)

    const triggers = query<HTMLElement>(accordion).getElementsByAttribute('aria-controls')
    const panels = query<HTMLElement>(accordion).getElementsByAttribute('aria-labelledby')

    for (let t of triggers) {
      expect(t.getAttribute('aria-expanded')).toBe('true')
    }

    for (let p of panels) {
      expect(p.getAttribute('aria-hidden')).toBe('false')
    }
  })

  it('does not gets disabled on sp', () => {
    global.innerWidth = 414

    const accordion = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    new Accordion(accordion)

    const triggers = query<HTMLElement>(accordion).getElementsByAttribute('aria-controls')
    const panels = query<HTMLElement>(accordion).getElementsByAttribute('aria-labelledby')

    for (let t of triggers) {
      expect(t.getAttribute('aria-expanded')).toBe('false')
    }

    for (let p of panels) {
      expect(p.getAttribute('aria-hidden')).toBe('true')
    }

    // resize
    global.innerWidth = 768
    global.dispatchEvent(new Event('resize'))

    for (let t of triggers) {
      expect(t.getAttribute('aria-expanded')).toBe('true')
    }

    for (let p of panels) {
      expect(p.getAttribute('aria-hidden')).toBe('false')
    }
  })
})

describe('Accordion Events', () => {
  beforeEach(() => {
    sessionStorage.clear()
    document.body.innerHTML = eventsHtml
  })

  it('should listen to open event', () => {
    const root = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]
    const accordion = new Accordion(root)

    root.dispatchEvent(new CustomEvent('ecmAccordionOpen', { detail: 'unstyledMultiplePanelAccordion1' }))
    expect(accordion.openPanels.map((p) => p.getAttribute('id'))).toStrictEqual(['unstyledMultiplePanelAccordion1'])
  })

  it('should listen to close event', () => {
    const root = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]
    const accordion = new Accordion(root)

    root.dispatchEvent(new CustomEvent('ecmAccordionClose', { detail: 'unstyledMultiplePanelAccordion1' }))
    expect(accordion.openPanels.map((p) => p.getAttribute('id'))).toStrictEqual([])
  })

  it('should listen to toggle event', () => {
    const root = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]
    const accordion = new Accordion(root)

    root.dispatchEvent(new CustomEvent('ecmAccordionToggle', { detail: 'unstyledMultiplePanelAccordion1' }))
    expect(accordion.openPanels.map((p) => p.getAttribute('id'))).toStrictEqual(['unstyledMultiplePanelAccordion1'])

    root.dispatchEvent(new CustomEvent('ecmAccordionToggle', { detail: 'unstyledMultiplePanelAccordion2' }))
    expect(accordion.openPanels.map((p) => p.getAttribute('id'))).toStrictEqual([
      'unstyledMultiplePanelAccordion1',
      'unstyledMultiplePanelAccordion2',
    ])

    root.dispatchEvent(new CustomEvent('ecmAccordionToggle', { detail: 'unstyledMultiplePanelAccordion3' }))
    expect(accordion.openPanels.map((p) => p.getAttribute('id'))).toStrictEqual([
      'unstyledMultiplePanelAccordion1',
      'unstyledMultiplePanelAccordion2',
      'unstyledMultiplePanelAccordion3',
    ])

    root.dispatchEvent(new CustomEvent('ecmAccordionToggle', { detail: 'unstyledMultiplePanelAccordion1' }))
    root.dispatchEvent(new CustomEvent('ecmAccordionToggle', { detail: 'unstyledMultiplePanelAccordion2' }))
    root.dispatchEvent(new CustomEvent('ecmAccordionToggle', { detail: 'unstyledMultiplePanelAccordion3' }))

    expect(accordion.openPanels.map((p) => p.getAttribute('id'))).toStrictEqual([])
  })
})
