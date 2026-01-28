/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { Parser } from './parser'
import { points } from './test_utils'

function renderTemplateChildrenToDiv(template: HTMLTemplateElement) {
  const wrapper = document.createElement('div')
  for (let child of [...template.content.children]) {
    wrapper.appendChild(child)
  }

  return wrapper
}

function createDom(htmlString: string) {
  const template = document.createElement('template')
  template.innerHTML = htmlString

  return renderTemplateChildrenToDiv(template)
}

describe('Parser', () => {
  const parser = new Parser()

  it('should parse root Object', () => {
    const data = `
      <div data-key="eventName">Christmas Day</div>
      <div data-key="lastUpdateDate">2025/01/01</div>
    `
    const dom = createDom(data)
    expect(parser.parse(dom)).toMatchInlineSnapshot(`
      {
        "eventName": "Christmas Day",
        "lastUpdateDate": "2025/01/01",
      }
    `)
  })

  it('should parse Object', () => {
    const data = `
    <div data-key="root" data-type="object">
      <div data-key="alpha">Alpha</div>
      <div data-key="bravo">Bravo</div>
      <div data-key="charlie">Charlie</div>
    </div>
    `
    const dom = createDom(data)
    expect(parser.parse(dom)).toMatchInlineSnapshot(`
      {
        "root": {
          "alpha": "Alpha",
          "bravo": "Bravo",
          "charlie": "Charlie",
        },
      }
    `)
  })

  it('should parse Array', () => {
    const data = `
    <div data-key="root" data-type="array">
      <div>Alpha</div>
      <div>Bravo</div>
      <div>Charlie</div>
    </div>
    `
    const dom = createDom(data)
    expect(parser.parse(dom)).toMatchInlineSnapshot(`
      {
        "root": [
          "Alpha",
          "Bravo",
          "Charlie",
        ],
      }
    `)
  })

  it('should parse nested Object', () => {
    const data = `
    <div data-key="root" data-type="object">
      <div data-key="kanagawa" data-type="object">
        <div data-key="name">Name</div>
        <div data-key="address" data-type="object">
          <div data-key="prefecture">Kanagawa</div>
          <div data-key="city">Kawasaki</div>
          <div data-key="ward">Tama-ku</div>
          <div data-key="neighbors" data-type="array">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
          </div>
        </div>
      </div>
      <div data-key="hamamatsu" data-type="object">
        <div data-key="name">Name</div>
        <div data-key="address" data-type="object">
          <div data-key="prefecture">Shizuoka</div>
          <div data-key="city">Hamamatsu</div>
          <div data-key="ward">Ichino-cho</div>
          <div data-key="neighbors" data-type="array">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
          </div>
        </div>
      </div>
    </div>
    `
    const dom = createDom(data)
    expect(parser.parse(dom)).toMatchInlineSnapshot(`
      {
        "root": {
          "hamamatsu": {
            "address": {
              "city": "Hamamatsu",
              "neighbors": [
                "Alpha",
                "Bravo",
                "Charlie",
              ],
              "prefecture": "Shizuoka",
              "ward": "Ichino-cho",
            },
            "name": "Name",
          },
          "kanagawa": {
            "address": {
              "city": "Kawasaki",
              "neighbors": [
                "Alpha",
                "Bravo",
                "Charlie",
              ],
              "prefecture": "Kanagawa",
              "ward": "Tama-ku",
            },
            "name": "Name",
          },
        },
      }
    `)
  })

  it('should parse nested Array', () => {
    const data = `
    <div data-key="root" data-type="array">
      <div data-key="child" data-type="object">
        <div data-key="name">Name</div>
        <div data-key="address" data-type="object">
          <div data-key="prefecture">Shizuoka</div>
          <div data-key="city">Hamamatsu</div>
          <div data-key="ward">Ichino-cho</div>
          <div data-key="neighbors" data-type="array">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
          </div>
        </div>
      </div>
      <div data-key="child" data-type="object">
        <div data-key="name">Name</div>
        <div data-key="address" data-type="object">
          <div data-key="prefecture">Kanagawa</div>
          <div data-key="city">Kawasaki</div>
          <div data-key="ward">Tama-ku</div>
          <div data-key="neighbors" data-type="array">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
          </div>
        </div>
      </div>
      <div data-key="child" data-type="object">
        <div data-key="name">Name</div>
        <div data-key="address" data-type="object">
          <div data-key="prefecture">Tokyo</div>
          <div data-key="city">Tokyo</div>
          <div data-key="ward">Shibuya</div>
          <div data-key="neighbors" data-type="array">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
          </div>
        </div>
      </div>
    </div>
    `
    const dom = createDom(data)
    expect(parser.parse(dom)).toMatchInlineSnapshot(`
      {
        "root": [
          {
            "address": {
              "city": "Hamamatsu",
              "neighbors": [
                "Alpha",
                "Bravo",
                "Charlie",
              ],
              "prefecture": "Shizuoka",
              "ward": "Ichino-cho",
            },
            "name": "Name",
          },
          {
            "address": {
              "city": "Kawasaki",
              "neighbors": [
                "Alpha",
                "Bravo",
                "Charlie",
              ],
              "prefecture": "Kanagawa",
              "ward": "Tama-ku",
            },
            "name": "Name",
          },
          {
            "address": {
              "city": "Tokyo",
              "neighbors": [
                "Alpha",
                "Bravo",
                "Charlie",
              ],
              "prefecture": "Tokyo",
              "ward": "Shibuya",
            },
            "name": "Name",
          },
        ],
      }
    `)
  })
})

describe('Parser Json String', () => {
  const parser = new Parser()

  it('should parse', () => {
    const str = JSON.stringify(points())
    expect(parser.parseString(str)).toStrictEqual(points())
  })
})
