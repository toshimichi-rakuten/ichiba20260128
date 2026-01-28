import { ECM_INITIALIZE_BLOCK_EVENT_NAME } from 'ecm/src/core/constants'

export const FET_MODULE_NAME = 'fet-personalized-display'

export class PersonalizedDisplay {
  root: HTMLElement
  views: PersonalizedDisplayView[] = []
  displayId: string

  constructor(root: HTMLElement) {
    this.root = root

    this.displayId = this.root.getAttribute('data-personalized-display-id')!
    if (!this.displayId) {
      throw new Error('[FET PersonalizedDisplay] "data-personalized-display-id" attribute not found.')
    }

    const viewEls = document.querySelectorAll(`[data-personalized-display-view="${this.displayId}"]`)
    this.views = [...viewEls].map((view) => new PersonalizedDisplayView(view as HTMLElement))

    const mutationCallback = (_mutations: MutationRecord[], observer: MutationObserver) => {
      const activeEls = [...this.root.querySelectorAll('[data-type]')] as HTMLElement[]
      const activeType = activeEls.length ? activeEls[0].getAttribute('data-type') : null

      if (!activeType) {
        throw new Error('[FET PersonalizedDisplay] element with "data-type" attribute not found inside root.')
      }

      for (let v of this.views) {
        v.render(activeType)
      }

      observer.disconnect()
    }

    const observer = new MutationObserver(mutationCallback)
    observer.observe(this.root, { childList: true, subtree: false, attributes: false })
  }
}

class PersonalizedDisplayView {
  root: HTMLElement
  templates: HTMLTemplateElement[] = []

  constructor(root: HTMLElement) {
    this.root = root
    this.templates = [...this.root.querySelectorAll('template')] as HTMLTemplateElement[]
  }

  render(type: string) {
    if (this.root.getAttribute('data-rendered') === 'true') {
      return
    }
    this.root.setAttribute('data-rendered', 'true')

    const activeTemplate = this.templates.find((t) => t.getAttribute('data-type') === type)
    if (!activeTemplate) {
      throw new Error(`[FET] template not found for "${type}"`)
    }

    this.root.innerHTML = activeTemplate.innerHTML + this.root.innerHTML

    const initEcm = activeTemplate.getAttribute('data-init-ecm')
    if (initEcm) {
      const event = new CustomEvent(ECM_INITIALIZE_BLOCK_EVENT_NAME, {
        detail: {
          target: this.root,
        },
      })

      document.dispatchEvent(event)
    }

    const initOldEcm = activeTemplate.getAttribute('data-init-old-ecm')
    if (initOldEcm) {
      const event = new Event('initializemodule')
      document.dispatchEvent(event)
    }

    const scriptsStr = activeTemplate.getAttribute('data-load-scripts')
    if (scriptsStr) {
      try {
        const parsed = JSON.parse(scriptsStr) as string[]
        for (let s of parsed) {
          const script = document.createElement('script')
          script.src = s
          document.body.appendChild(script)
        }
      } catch {
        console.error('[FET] [PersonalizedDisplay] cannot parse data-load-scripts')
      }
    }

    // const initRat = activeTemplate.getAttribute('data-init-rat') === 'true'
    // if (initRat) {
    //   try {
    //     // Initialize RAT events
    //     // https://confluence.rakuten-it.com/confluence/display/RAT/Setup+for+WEB+Measurement#SetupforWEBMeasurement-AddingRATJavaScriptcodetoYourSite
    //     // https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=2580104453
    //     window.RAT?.bind(this.root)
    //   } catch {
    //     console.error('[FET] [PersonalizedDisplay] failed to init RAT')
    //   }
    // }
  }
}
