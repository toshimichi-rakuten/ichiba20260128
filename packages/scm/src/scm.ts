import { ECM_INITIALIZED_ATTRIBUTE, ECM_PLUGIN_NAME_ATTRIBUTE, ECM_SKIP_INIT_ATTRIBUTE } from '@ecm/core/constants'

import { SCM_MODULE_NAME as AISearchName, AISearch } from './modules/ai-search'

import { InitParams, InitEventParams } from '@ecm/core'

export const SCM_INITIALIZE_BLOCK_EVENT_NAME = 'scmInitializeBlock'

function initAISearch({ root, mount }: InitParams) {
  const targets = [...root.querySelectorAll(`[${ECM_PLUGIN_NAME_ATTRIBUTE}="${AISearchName}"]`)]
    .filter((f) => f.getAttribute(ECM_INITIALIZED_ATTRIBUTE) !== 'true')
    .filter((f) => {
      if (mount) {
        return f.getAttribute(ECM_SKIP_INIT_ATTRIBUTE) !== 'true'
      }

      return true
    }) as HTMLElement[]

  for (let t of targets) {
    t.setAttribute(ECM_INITIALIZED_ATTRIBUTE, 'true')
    new AISearch(t)
  }
}

export class SCM {
  constructor() {
    this.init({
      root: document,
      mount: true,
    })

    document.addEventListener(SCM_INITIALIZE_BLOCK_EVENT_NAME, (e: Event) => {
      const detail = (<CustomEvent<InitEventParams>>e).detail
      const target = detail.target

      this.init({
        root: target,
        mount: false,
      })
    })
  }

  init(initParam: InitParams) {
    try {
      initAISearch(initParam)
    } catch (e) {
      console.error('Failed to init: ', e)
    }
  }
}
