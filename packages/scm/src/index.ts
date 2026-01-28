import { SCM } from './scm'
import './index.scss'

declare global {
  interface Window {
    __SCM: SCM
    RAT: {
      addCustomEvent?: (params: any) => void
      bind: (t: any) => void
      $Selector: (t: any) => any
    }
    jQuery: any
  }
}

window.__SCM = new SCM()
