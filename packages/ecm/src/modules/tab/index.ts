import { query } from '../../_utils'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-tab'

type TabGroup = {
  tab: HTMLElement
  panel: HTMLElement
}

export class Tab {
  root: HTMLElement
  tabs: HTMLElement[]
  panels: HTMLElement[]
  tabGroups: TabGroup[]
  _activeTabGroup: TabGroup

  sessionKey?: string

  constructor(root: HTMLElement, ecm?: ECM) {
    this.root = root

    const session = this.root.getAttribute('data-session') !== 'false'
    if (session && ecm) {
      this.sessionKey = ecm.session.create(ECM_MODULE_NAME)
    }

    this.tabs = query<HTMLElement>(this.root).getElementsByAttribute('data-tab')
    this.panels = query<HTMLElement>(this.root).getElementsByAttribute('data-tabpanel')

    const groupName = this.root.getAttribute('data-tab-group-name')
    if (groupName) {
      this.tabs = this.tabs.filter((t) => t.getAttribute('data-tab') === groupName)
      this.panels = this.panels.filter((t) => t.getAttribute('data-tabpanel') === groupName)
    }

    this.createTabGroups()
    this.addClickListener()
    this.setDefaultOpen()
    this.setEvents()
  }

  private setEvents() {
    this.root.addEventListener('ecmTabSet', (e) => {
      const tabId = (e as CustomEvent).detail
      const group = this.tabGroups.find((g) => g.panel.getAttribute('id') === tabId)

      if (!group) {
        throw new Error(`[ECM] [Tab] panel with tab-id="${tabId}" not found.`)
      }

      this.activeTabGroup = group
    })
  }

  private setDefaultOpen() {
    if (this.sessionKey) {
      const defaultOpenSession = window.sessionStorage.getItem(this.sessionKey)
      const defaultOpenSessionGroup = this.tabGroups.find((g) => g.panel.getAttribute('id') === defaultOpenSession)

      if (defaultOpenSessionGroup) {
        this.activeTabGroup = defaultOpenSessionGroup
        return
      }
    }

    const defaultOpen = this.root.getAttribute('data-default-open')
    const defaultOpenGroup = this.tabGroups.find((g) => g.panel.getAttribute('id') === defaultOpen)

    if (!defaultOpenGroup) {
      throw new Error(`[ECM Tab] TabPanel with "${defaultOpen}" ID not found.`)
    }

    this.activeTabGroup = defaultOpenGroup
  }

  get activeTabGroup() {
    return this._activeTabGroup
  }

  set activeTabGroup(newValue) {
    this._activeTabGroup = newValue

    const { panel, tab } = this._activeTabGroup

    for (let c of this.panels) {
      c.setAttribute('aria-hidden', 'true')
    }

    panel.setAttribute('aria-hidden', 'false')

    for (let t of this.tabs) {
      t.setAttribute('aria-selected', 'false')
    }

    tab.setAttribute('aria-selected', 'true')

    const panelId = panel.getAttribute('id')

    if (panelId && this.sessionKey) {
      window.sessionStorage.setItem(this.sessionKey, panelId)
    }
  }

  private addClickListener(): void {
    for (let group of this.tabGroups) {
      const { tab } = group

      tab.addEventListener('click', () => {
        const isActive = tab.getAttribute('aria-selected') === 'true'

        /** Prevent unnecessary render if it's active already. */
        if (isActive) {
          return
        }

        this.activeTabGroup = group
      })
    }
  }

  private createTabGroups(): void {
    this.tabGroups = this.tabs.map((s) => {
      const tabPanelId = s.getAttribute('aria-controls')

      const panel = this.panels.find((c) => c.getAttribute('id') === tabPanelId)

      if (!panel) {
        throw new Error(`[ECM Tab] TabPanel with "${tabPanelId}" ID not found.`)
      }

      return {
        tab: s,
        panel: panel,
      }
    })
  }
}
