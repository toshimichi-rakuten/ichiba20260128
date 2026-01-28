type EventHandler<T = any> = (data: T) => void

export type AISearchEvents = {
  'form:reset': void
  'form:submitted': void
  'results:render': { items: any[]; headline: string }
  'results:render-loading': void
  'results:render-empty': void
  'results:render-error': void
}

export class EventBus {
  private listeners: Map<string, Set<EventHandler>> = new Map()

  on<K extends keyof AISearchEvents>(event: K, handler: EventHandler<AISearchEvents[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    this.listeners.get(event)!.add(handler)

    // Return unsubscribe function
    return () => {
      this.off(event, handler)
    }
  }

  off<K extends keyof AISearchEvents>(event: K, handler: EventHandler<AISearchEvents[K]>): void {
    const handlers = this.listeners.get(event)
    if (handlers) {
      handlers.delete(handler)
    }
  }

  emit<K extends keyof AISearchEvents>(event: K, data?: AISearchEvents[K]): void {
    const handlers = this.listeners.get(event)
    if (!handlers) {
      return
    }

    for (const handler of handlers) {
      handler(data)
    }
  }

  clear(): void {
    this.listeners.clear()
  }
}
