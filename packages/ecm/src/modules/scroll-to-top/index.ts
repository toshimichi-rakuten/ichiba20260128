import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-scroll-to-top'

export class ScrollToTop {
  root: HTMLElement

  constructor(root: HTMLElement, _ecm?: ECM) {
    this.root = root
    this._setupClick()
  }

  _setupClick() {
    this.root.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    })
  }
}
