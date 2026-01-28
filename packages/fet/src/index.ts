import { FET } from './fet'

declare global {
  interface Window {
    __FET: FET
    RAT?: {
      addCustomEvent?: (params: any) => void
      bind: (t: any) => void
      $Selector: (t: any) => any
    }
  }
}

window.__FET = new FET()
