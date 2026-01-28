import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import soloCouponHtml from './solo_coupon.html?raw'
import soloItemHtml from './solo_item.html?raw'
import { generateStatic } from './generator'
import { replaceSoloTemplate } from './static'

import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/AlcorCoupon',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()
      })

      return story()
    },
  ],
}

export default Story

export const SoloCoupon = () => replaceSoloTemplate(soloCouponHtml)
export const SoloItem = () => replaceSoloTemplate(soloItemHtml)
export const CouponColumn = () =>
  generateStatic({
    type: 'coupon',
    viewMore: false,
    spColumn: 2,
    pcColumn: 4,
  })
export const CouponWithItem = () =>
  generateStatic({
    type: 'couponWithItem',
    viewMore: false,
    spColumn: 2,
    pcColumn: 4,
  })
export const CouponWithItemViewMore = () =>
  generateStatic({
    type: 'couponWithItem',
    viewMore: true,
    viewMoreVisible: 2,
    viewMoreVisibleMd: 4,
    spColumn: 2,
    pcColumn: 4,
  })
export const ItemOnly = () =>
  generateStatic({
    type: 'item',
    viewMore: false,
    spColumn: 2,
    pcColumn: 4,
  })
export const ItemOnlyViewMore = () =>
  generateStatic({
    type: 'item',
    viewMore: true,
    viewMoreVisible: 2,
    viewMoreVisibleMd: 4,
    spColumn: 2,
    pcColumn: 4,
  })
