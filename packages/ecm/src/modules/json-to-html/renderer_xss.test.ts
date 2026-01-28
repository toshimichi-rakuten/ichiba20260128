/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { Renderer } from './renderer'
import { xssOutput, xssTemplates } from './test_utils'

const xss = `<img src=x onerror=alert('hacked!')>`

describe('Renderer XSS', () => {
  it('should prevent XSS on output template', () => {
    const renderer = new Renderer([], 'escape')

    const data = {
      result: xss,
    }

    const outputTemplate = xssOutput()

    expect(renderer.render(outputTemplate, data, '')).toMatchInlineSnapshot(`
      "
          <div>&lt;img src="x" /&gt;</div>
        "
    `)
  })

  it('should prevent XSS on templates', () => {
    const outputTemplate = xssOutput()
    const testTemplates = xssTemplates()

    const renderer = new Renderer(testTemplates, 'escape')

    const data = {
      result: {
        foo: xss,
        far: xss,
        faz: xss,
        nested: [
          {
            boo: xss,
            bar: xss,
            baz: xss,
          },
          {
            boo: xss,
            bar: xss,
            baz: xss,
          },
          {
            boo: xss,
            bar: xss,
            baz: xss,
          },
        ],
        goo: [xss, xss, xss],
      },
    }

    expect(renderer.render(outputTemplate, data, '')).toMatchInlineSnapshot(`
      "
          <div>
                <div>&lt;img src="x" /&gt;</div>
                <div>&lt;img src="x" /&gt;</div>
                <div>&lt;img src="x" /&gt;</div>
                <div>
              <div>&lt;img src="x" /&gt;</div>
              <div>&lt;img src="x" /&gt;</div>
              <div>&lt;img src="x" /&gt;</div>
            
              <div>&lt;img src="x" /&gt;</div>
              <div>&lt;img src="x" /&gt;</div>
              <div>&lt;img src="x" /&gt;</div>
            
              <div>&lt;img src="x" /&gt;</div>
              <div>&lt;img src="x" /&gt;</div>
              <div>&lt;img src="x" /&gt;</div>
            </div>
            </div>
        "
    `)
  })
})
