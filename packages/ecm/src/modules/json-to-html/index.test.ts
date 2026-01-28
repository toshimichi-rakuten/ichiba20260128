/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { JSONToHTML, ECM_MODULE_NAME } from '.'
import { query } from '../../_utils'
import defaultHtml from './default.html?raw'
import { output, templates, points } from './test_utils'

describe('JSONToHTML', () => {
  it('should initialized', () => {
    document.body.innerHTML = defaultHtml

    const root = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new JSONToHTML(root)
    }).not.toThrowError()

    expect(document.body.innerHTML).toMatchSnapshot()
  })
})

describe('JSONToHTML Events', () => {
  it('should listen for events', () => {
    document.body.innerHTML = `
      <div id="j2h1" data-module-name="ecm-json-to-html" data-controlled="true">
      </div>
    `

    const root = query<HTMLElement>(document).getElementsByAttribute({
      'data-module-name': ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new JSONToHTML(root)
    }).not.toThrowError()

    root.appendChild(output())
    for (let t of templates()) {
      root.appendChild(t)
    }

    root.dispatchEvent(new CustomEvent('ecmJsonToHtmlSetData', { detail: points() }))
    root.dispatchEvent(new Event('ecmJsonToHtmlLoadTemplates'))
    root.dispatchEvent(new Event('ecmJsonToHtmlRender'))

    expect(document.body.innerHTML).toMatchSnapshot()
  })
})
