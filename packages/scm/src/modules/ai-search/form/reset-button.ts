import type { EventBus } from '../event-bus'

export class ResetButton {
  root: HTMLButtonElement
  eventBus: EventBus

  constructor(root: HTMLButtonElement, eventBus: EventBus) {
    this.root = root
    this.eventBus = eventBus
    this.setup()
  }

  private setup() {
    this.root.addEventListener('click', () => {
      this.eventBus.emit('form:reset')
    })
  }
}
