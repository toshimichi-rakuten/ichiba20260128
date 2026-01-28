import { ECM } from './core'
import './core/index.scss'

declare global {
  interface Window {
    __ECM: ECM
    RAT?: {
      addCustomEvent?: (params: any) => void
      bind: (t: any) => void
      $Selector: (t: any) => any
    }
    jQuery: any
  }
}

window.__ECM = new ECM()
