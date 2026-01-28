/**
 * @vitest-environment jsdom
 */
import { vi, describe, it, expect } from 'vitest'
import { query } from '../_utils'
import { ECM } from './'
import {
  ECM_INITIALIZED_ATTRIBUTE,
  ECM_DYNAMIC_CONTENT_NAME,
  ECM_INITIALIZE_EVENT_NAME,
  ECM_INITIALIZE_BLOCK_EVENT_NAME,
  ECM_SKIP_INIT_ATTRIBUTE,
} from '../core/constants'
import { ECM_MODULE_NAME as TOGGLE_NAME } from '../modules/toggle'
import { ECM_MODULE_NAME as FLOATING_NAME } from '../modules/floating'
import toggleHtml from '../modules/toggle/default.html?raw'
import floatingHtml from '../modules/floating/default.html?raw'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('ECM', () => {
  it('should load modules and add initialiaze attribute', () => {
    document.body.innerHTML = toggleHtml
    new ECM()

    const toggle = query<HTMLButtonElement>(document).getElementsByAttribute({
      'data-module-name': TOGGLE_NAME,
    })[0]

    expect(toggle.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')
  })

  it('should be backwards compatible with autoparameter', () => {
    document.body.innerHTML = `
      <div id="a1" class="js-auto-parameter">
      </div>
      <div id="a2" class="rp-autoParameter">
      </div>
      <div id="a3" class="rp-autoParameter--initialized">
      </div>
      <div id="a4" data-module-name="ecm-auto-parameter">
      </div>
    `

    new ECM()

    expect(document.getElementById('a1')?.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')

    expect(document.getElementById('a2')?.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')

    expect(document.getElementById('a3')?.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBeFalsy()

    expect(document.getElementById('a4')?.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')
  })

  it('should observe dynamic content', async () => {
    document.body.innerHTML = `
      <div data-module-name=${ECM_DYNAMIC_CONTENT_NAME}></div>
    `
    new ECM()

    const dynamic = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_DYNAMIC_CONTENT_NAME,
    })[0]

    expect(dynamic.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')

    dynamic.innerHTML = toggleHtml

    // Tick the next render
    await new Promise(process.nextTick)

    const toggle = query<HTMLButtonElement>(document).getElementsByAttribute({
      'data-module-name': TOGGLE_NAME,
    })[0]

    expect(toggle.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')
  })

  it('should listen for initialize event', () => {
    document.body.innerHTML = toggleHtml

    const toggle = query<HTMLButtonElement>(document).getElementsByAttribute({
      'data-module-name': TOGGLE_NAME,
    })[0]

    toggle.setAttribute(ECM_SKIP_INIT_ATTRIBUTE, 'true')

    new ECM()

    expect(toggle.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe(null)

    const event = new CustomEvent(ECM_INITIALIZE_EVENT_NAME, {
      detail: {
        target: toggle,
      },
    })

    document.dispatchEvent(event)

    expect(toggle.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')
  })

  it('should listen for initialize event (block)', () => {
    document.body.innerHTML = `
      <div id="testBlock">
        ${toggleHtml}
        ${floatingHtml}
      </div>
    `

    const toggle = query<HTMLButtonElement>(document).getElementsByAttribute({
      'data-module-name': TOGGLE_NAME,
    })[0]

    toggle.setAttribute(ECM_SKIP_INIT_ATTRIBUTE, 'true')

    const floating = query<HTMLButtonElement>(document).getElementsByAttribute({
      'data-module-name': FLOATING_NAME,
    })[0]

    floating.setAttribute(ECM_SKIP_INIT_ATTRIBUTE, 'true')

    new ECM()

    expect(toggle.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe(null)
    expect(floating.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe(null)

    const event = new CustomEvent(ECM_INITIALIZE_BLOCK_EVENT_NAME, {
      detail: {
        target: document.getElementById('testBlock'),
      },
    })

    document.dispatchEvent(event)

    expect(toggle.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')
    expect(floating.getAttribute(ECM_INITIALIZED_ATTRIBUTE)).toBe('true')
  })
})
