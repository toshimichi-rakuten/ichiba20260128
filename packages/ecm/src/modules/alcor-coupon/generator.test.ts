/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { generateIntegration } from './generator'

describe('Coupon Alcor Generator', () => {
  it('type: coupon', () => {
    const html = generateIntegration({
      type: 'coupon',
      viewMore: false,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
  it('type: coupon with item', () => {
    const html = generateIntegration({
      type: 'couponWithItem',
      viewMore: false,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
  it('type: coupon with item with view more', () => {
    const html = generateIntegration({
      type: 'couponWithItem',
      viewMore: true,
      viewMoreVisible: 4,
      viewMoreVisibleMd: 4,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
  it('type: coupon with item with view more (Responsive)', () => {
    const html = generateIntegration({
      type: 'couponWithItem',
      viewMore: true,
      viewMoreVisible: 2,
      viewMoreVisibleMd: 4,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
  it('type: item', () => {
    const html = generateIntegration({
      type: 'item',
      viewMore: false,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
  it('type: item with view more', () => {
    const html = generateIntegration({
      type: 'item',
      viewMore: true,
      viewMoreVisible: 4,
      viewMoreVisibleMd: 4,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
  it('type: item with view more (Responsive)', () => {
    const html = generateIntegration({
      type: 'item',
      viewMore: true,
      viewMoreVisible: 2,
      viewMoreVisibleMd: 4,
      spColumn: 2,
      pcColumn: 4,
    })

    expect(html).toMatchSnapshot()
  })
})
