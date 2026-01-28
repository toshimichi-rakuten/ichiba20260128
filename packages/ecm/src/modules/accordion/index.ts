import { query, toBoolean } from '../../_utils'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-accordion'

function checkDisableValue(device: 'sp' | 'md', value: null | 'open' | 'closed') {
  if (!value) {
    return
  }

  if (!['open', 'closed'].includes(value)) {
    throw new Error(`[ECM Accordion] data-${device}-disabled value can only be "open" or "closed".`)
  }
}

function getCurrentView() {
  if (window.innerWidth >= 768) return 'md'
  return 'sp'
}

export class Accordion {
  root: HTMLElement
  isMultiple: boolean
  triggers: HTMLElement[]
  panels: HTMLElement[]
  spDisabled: null | 'open' | 'closed'
  mdDisabled: null | 'open' | 'closed'
  _currentView: 'sp' | 'md'

  sessionKey?: string
  openPanels: HTMLElement[] = []

  constructor(root: HTMLElement, ecm?: ECM) {
    this.root = root

    this.isMultiple = this.root.getAttribute('data-multiple') === 'true'

    this.spDisabled = this.root.getAttribute('data-sp-disabled') as null | 'open' | 'closed'

    checkDisableValue('sp', this.spDisabled)

    this.mdDisabled = this.root.getAttribute('data-md-disabled') as null | 'open' | 'closed'

    checkDisableValue('md', this.mdDisabled)

    this.triggers = query<HTMLElement>(this.root).getElementsByAttribute('data-accordion-trigger')

    this.panels = query<HTMLElement>(this.root).getElementsByAttribute('data-accordion-panel')

    this.currentView = getCurrentView()

    const session = this.root.getAttribute('data-session') !== 'false'
    if (session && ecm) {
      this.sessionKey = ecm.session.create(ECM_MODULE_NAME)
    }

    window.addEventListener('resize', () => {
      const newValue = getCurrentView()
      const didChange = newValue != this.currentView

      if (didChange) {
        this.currentView = newValue
      }
    })

    this.addClickListener()
    this.setDefaultOpen()
    this.setEvents()
  }

  get isDisabled() {
    if (this.currentView == 'sp' && this.spDisabled) {
      return true
    }

    if (this.currentView == 'md' && this.mdDisabled) {
      return true
    }

    return false
  }

  get currentView() {
    return this._currentView
  }

  set currentView(newValue: 'sp' | 'md') {
    this._currentView = newValue

    if (newValue == 'sp') {
      if (!this.spDisabled) {
        return
      }

      this.spDisabled == 'open' ? this.openAll() : this.closeAll()
    }

    if (newValue == 'md') {
      if (!this.mdDisabled) {
        return
      }

      this.mdDisabled == 'open' ? this.openAll() : this.closeAll()
    }
  }

  private openAll() {
    for (let p of this.panels) {
      p.setAttribute('aria-hidden', 'false')
    }

    for (let t of this.triggers) {
      t.setAttribute('aria-expanded', 'true')
    }

    this.openPanels = this.panels
  }

  private closeAll() {
    for (let p of this.panels) {
      p.setAttribute('aria-hidden', 'true')
    }

    for (let t of this.triggers) {
      t.setAttribute('aria-expanded', 'false')
    }

    this.openPanels = []
  }

  private addClickListener(): void {
    for (let trigger of this.triggers) {
      trigger.addEventListener('click', () => {
        this.onTriggerClick(trigger)
      })
    }
  }

  private onTriggerClick(trigger: HTMLElement) {
    if (this.isDisabled) {
      return
    }

    const panelId = trigger.getAttribute('aria-controls')
    const panel = this.panels.find((el) => el.getAttribute('id') == panelId)

    if (!panel) {
      throw new Error(`[ECM Accordion] AccordionContent with id="${panelId}" not found.`)
    }

    this.togglePanel(panel, trigger)
  }

  private togglePanel(panel: HTMLElement, trigger: HTMLElement) {
    const willClose = toBoolean(trigger.getAttribute('aria-expanded'))

    if (willClose) {
      this.closePanel(panel, trigger)
      return
    }

    this.openPanel(panel, trigger)
  }

  private openPanel(panel: HTMLElement, trigger: HTMLElement) {
    if (!this.isMultiple) {
      this.closeAll()
    }

    panel.setAttribute('aria-hidden', 'false')
    trigger.setAttribute('aria-expanded', 'true')
    this.openPanels = [...this.openPanels, panel]
    this.savetoSession()
  }

  private closePanel(panel: HTMLElement, trigger: HTMLElement) {
    panel.setAttribute('aria-hidden', 'true')
    trigger.setAttribute('aria-expanded', 'false')
    this.openPanels = this.openPanels.filter((p) => p.getAttribute('id') != panel.getAttribute('id'))
    this.savetoSession()
  }

  private savetoSession() {
    const panels = this.openPanels.map((p) => p.getAttribute('id'))

    if (this.sessionKey) {
      window.sessionStorage.setItem(this.sessionKey, JSON.stringify(panels))
    }
  }

  private setDefaultOpen() {
    if (!this.sessionKey) {
      return
    }

    const cache = window.sessionStorage.getItem(this.sessionKey)

    if (!cache) {
      return
    }

    const openPanelsId = JSON.parse(cache)

    for (let p of this.panels) {
      const shouldOpen = openPanelsId.includes(p.getAttribute('id'))

      if (shouldOpen) {
        p.setAttribute('aria-hidden', 'false')
      }
    }

    for (let t of this.triggers) {
      const shouldOpen = openPanelsId.includes(t.getAttribute('aria-controls'))

      if (shouldOpen) {
        t.setAttribute('aria-expanded', 'true')
      }
    }
  }

  private setEvents() {
    this.root.addEventListener('ecmAccordionOpen', (e) => {
      const panelId = (e as CustomEvent).detail

      const panel = this.panels.find((el) => el.getAttribute('id') == panelId)
      const trigger = this.triggers.find((el) => el.getAttribute('aria-controls') === panelId)

      if (!panel) {
        throw new Error(`[ECM] [Accordion] panel with id="${panelId}" not found.`)
      }

      if (!trigger) {
        throw new Error(`[ECM] [Accordion] trigger with aria-controls="${panelId}" not found.`)
      }

      this.openPanel(panel, trigger)
    })

    this.root.addEventListener('ecmAccordionClose', (e) => {
      const panelId = (e as CustomEvent).detail

      const panel = this.panels.find((el) => el.getAttribute('id') == panelId)
      const trigger = this.triggers.find((el) => el.getAttribute('aria-controls') === panelId)

      if (!panel) {
        throw new Error(`[ECM] [Accordion] panel with id="${panelId}" not found.`)
      }

      if (!trigger) {
        throw new Error(`[ECM] [Accordion] trigger with aria-controls="${panelId}" not found.`)
      }

      this.closePanel(panel, trigger)
    })

    this.root.addEventListener('ecmAccordionToggle', (e) => {
      const panelId = (e as CustomEvent).detail

      const panel = this.panels.find((el) => el.getAttribute('id') == panelId)
      const trigger = this.triggers.find((el) => el.getAttribute('aria-controls') === panelId)

      if (!panel) {
        throw new Error(`[ECM] [Accordion] panel with id="${panelId}" not found.`)
      }

      if (!trigger) {
        throw new Error(`[ECM] [Accordion] trigger with aria-controls="${panelId}" not found.`)
      }

      this.togglePanel(panel, trigger)
    })
  }
}
