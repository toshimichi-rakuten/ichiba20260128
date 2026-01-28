import { ModuleName } from '.'

export class Session {
  state: Map<ModuleName, number>

  constructor() {
    this.state = new Map<ModuleName, number>()
  }

  create(moduleName: ModuleName) {
    const currentIndex = this.state.get(moduleName) || 0

    this.state.set(moduleName, currentIndex + 1)

    const path = window.location.pathname.replaceAll('/', '-') || 'rakuten'
    return `${path}-${moduleName}-${currentIndex}`
  }
}
