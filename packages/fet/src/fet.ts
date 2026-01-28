import { ECM_INITIALIZED_ATTRIBUTE, ECM_PLUGIN_NAME_ATTRIBUTE, ECM_SKIP_INIT_ATTRIBUTE } from 'ecm/src/core/constants'

import { FET_MODULE_NAME as PersonalizedDisplayName, PersonalizedDisplay } from './modules/personalized-display'

function initPersonalizedDisplay() {
  const roots = [...document.querySelectorAll(`[${ECM_PLUGIN_NAME_ATTRIBUTE}="${PersonalizedDisplayName}"]`)]
    .filter((f) => f.getAttribute(ECM_INITIALIZED_ATTRIBUTE) !== 'true')
    .filter((f) => f.getAttribute(ECM_SKIP_INIT_ATTRIBUTE) !== 'true') as HTMLElement[]

  for (let root of roots) {
    root.setAttribute(ECM_INITIALIZED_ATTRIBUTE, 'true')
    new PersonalizedDisplay(root)
  }
}

export class FET {
  constructor() {
    try {
      initPersonalizedDisplay()
    } catch (e) {
      console.error('Failed to init: ', e)
    }
  }
}
