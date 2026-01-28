/**
 * @vitest-environment jsdom
 */
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { Alcor, ECM_MODULE_NAME } from '.'
import normalHtml from './index_normal.html?raw'
import manufactureHtml from './index_manufacture.html?raw'
import dealHtml from './index_deal.html?raw'
import roomHtml from './index_room.html?raw'
import couponHtml from './index_coupon.html?raw'
import rankingHtml from './index_ranking.html?raw'
import extraHtml from './extra.html?raw'
import { query } from '../../_utils'
import { normalTags, manufactureTags, dealTags, roomTags, couponTags, rankingTags } from './tags'
import { ECM_MODULE_NAME_ATTRIBUTE } from '../../core/constants'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// TODO: Add more test
describe('Alcor', () => {
  beforeEach(() => {
    document.body.innerHTML = normalHtml
  })

  it('should be initialized without error', () => {
    const alcors = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })

    for (let alcor of alcors) {
      expect(() => {
        new Alcor(alcor)
      }).not.toThrowError()
    }
  })
})

describe('Alcor Extra Data', () => {
  beforeEach(() => {
    document.body.innerHTML = extraHtml
  })

  it('should render extra data', () => {
    const alcor = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    new Alcor(alcor)

    const container = query<HTMLElement>(document).getElementsByAttribute('data-alcor-item-container')[0]
    const firstAnchor = query(container).getElementsByTagName('a')[0]
    const thirdAnchor = query(container).getElementsByTagName('a')[1]

    expect(firstAnchor.getAttribute('href')).toBe(
      'https://search.rakuten.co.jp/search/mall/%E3%82%BA%E3%83%AF%E3%82%A4%E3%82%AC%E3%83%8B/100227/tg1011126'
    )
    expect(firstAnchor.innerHTML).toBe('ズワイガニ')

    expect(thirdAnchor.getAttribute('href')).toBe('https://search.rakuten.co.jp/search/mall/cheese/')
    expect(thirdAnchor.innerHTML).toBe('Cheese')
  })
})

describe('Alcor tags', () => {
  it('[normal] should use the correct tags', () => {
    document.body.innerHTML = normalHtml
    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    const alcor = new Alcor(root)
    expect(alcor.tags).toStrictEqual(normalTags)
  })
  it('[manufacture] should use the correct tags', () => {
    document.body.innerHTML = manufactureHtml
    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    const alcor = new Alcor(root)
    expect(alcor.tags).toStrictEqual(manufactureTags)
  })
  it('[deal] should use the correct tags', () => {
    document.body.innerHTML = dealHtml
    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    const alcor = new Alcor(root)
    expect(alcor.tags).toStrictEqual(dealTags)
  })
  it('[room] should use the correct tags', () => {
    document.body.innerHTML = roomHtml
    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    const alcor = new Alcor(root)
    expect(alcor.tags).toStrictEqual(roomTags)
  })
  it('[coupon] should use the correct tags', () => {
    document.body.innerHTML = couponHtml
    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    const alcor = new Alcor(root)
    expect(alcor.tags).toStrictEqual(couponTags)
  })
  it('[ranking] should use the correct tags', () => {
    document.body.innerHTML = rankingHtml
    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    const alcor = new Alcor(root)
    expect(alcor.tags).toStrictEqual(rankingTags)
  })
})

describe('Auto ex Param', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should add _ex parameter to rendered images when conditions are met', () => {
    // Create a complete Alcor component with image that has resize parameter
    document.body.innerHTML = `
      <div data-module-name="ecm-alcor" data-alcor-type="normal">
        <template data-alcor-output>
          <div data-alcor-item-container></div>
        </template>

        <template data-alcor-data>
          <div data-alcor-item>
            <div data-key="itemname">Test Product</div>
            <div data-key="item-url">#</div>
            <div data-key="image-url">https://tshop.r10s.jp/shop/cabinet/product.jpg</div>
          </div>
        </template>

        <template data-alcor-item-template>
          <div>
            <img
              src="https://tshop.r10s.jp/default.jpg?resize=340:340"
              data-lazy-loading="###image-url###"
              alt="###itemname###"
            />
          </div>
        </template>
      </div>
    `

    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    new Alcor(root)

    const container = query<HTMLElement>(document).getElementsByAttribute('data-alcor-item-container')[0]
    const img = query(container).getElementsByTagName('img')[0]

    expect(img.getAttribute('data-lazy-loading')).toBe('https://tshop.r10s.jp/shop/cabinet/product.jpg?_ex=340:340')
  })

  it('should not add _ex parameter when host is not supported', () => {
    document.body.innerHTML = `
      <div data-module-name="ecm-alcor" data-alcor-type="normal">
        <template data-alcor-output>
          <div data-alcor-item-container></div>
        </template>

        <template data-alcor-data>
          <div data-alcor-item>
            <div data-key="itemname">Test Product</div>
            <div data-key="item-url">#</div>
            <div data-key="image-url">https://example.com/image.jpg</div>
          </div>
        </template>

        <template data-alcor-item-template>
          <div>
            <img
              src="https://example.com/default.jpg?resize=340:340"
              data-lazy-loading="###image-url###"
              alt="###itemname###"
            />
          </div>
        </template>
      </div>
    `

    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    new Alcor(root)

    const container = query<HTMLElement>(document).getElementsByAttribute('data-alcor-item-container')[0]
    const img = query(container).getElementsByTagName('img')[0]

    expect(img.getAttribute('data-lazy-loading')).toBe('https://example.com/image.jpg')
  })

  it('should not add _ex parameter when resize parameter is missing', () => {
    document.body.innerHTML = `
      <div data-module-name="ecm-alcor" data-alcor-type="normal">
        <template data-alcor-output>
          <div data-alcor-item-container></div>
        </template>

        <template data-alcor-data>
          <div data-alcor-item>
            <div data-key="itemname">Test Product</div>
            <div data-key="item-url">#</div>
            <div data-key="image-url">https://tshop.r10s.jp/shop/cabinet/product.jpg</div>
          </div>
        </template>

        <template data-alcor-item-template>
          <div>
            <img
              src="https://tshop.r10s.jp/default.jpg"
              data-lazy-loading="###image-url###"
              alt="###itemname###"
            />
          </div>
        </template>
      </div>
    `

    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    new Alcor(root)

    const container = query<HTMLElement>(document).getElementsByAttribute('data-alcor-item-container')[0]
    const img = query(container).getElementsByTagName('img')[0]

    expect(img.getAttribute('data-lazy-loading')).toBe('https://tshop.r10s.jp/shop/cabinet/product.jpg')
  })

  it('[ranking] should add _ex parameter to rendered images when conditions are met', () => {
    document.body.innerHTML = `
      <div data-module-name="ecm-alcor" data-alcor-type="ranking">
        <template data-alcor-output>
          <div data-alcor-item-container></div>
        </template>

        <template data-alcor-data>
          <div data-alcor-item>
            <div data-key="itemname">Test Ranking Product</div>
            <div data-key="imageurl">https://tshop.r10s.jp/shop/cabinet/ranking-product.jpg</div>
          </div>
        </template>

        <template data-alcor-item-template>
          <div>
            <img
              src="https://tshop.r10s.jp/default.jpg?resize=340:340"
              data-lazy-loading="###imageurl###"
              alt="###itemname###"
            />
          </div>
        </template>
      </div>
    `

    const root = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    new Alcor(root)

    const container = query<HTMLElement>(document).getElementsByAttribute('data-alcor-item-container')[0]
    const img = query(container).getElementsByTagName('img')[0]

    expect(img.getAttribute('data-lazy-loading')).toBe(
      'https://tshop.r10s.jp/shop/cabinet/ranking-product.jpg?_ex=340:340'
    )
  })
})
