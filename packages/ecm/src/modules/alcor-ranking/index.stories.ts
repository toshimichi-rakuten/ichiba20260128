import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import soloHtml from './solo.html?raw'

import {
  staticColumnPriceShopHtml,
  staticColumnPriceNameHtml,
  staticColumnPriceNameShopHtml,
  staticColumnPriceNameReviewShopHtml,
  staticColumnViewMorePriceShopHtml,
  staticColumnViewMorePriceNameHtml,
  staticColumnViewMorePriceNameShopHtml,
  staticColumnViewMorePriceNameReviewShopHtml,
  staticSPHorizontalPCColumnPriceShopHtml,
  staticSPHorizontalPCColumnPriceNameHtml,
  staticSPHorizontalPCColumnPriceNameShopHtml,
  staticSPHorizontalPCColumnPriceNameReviewShopHtml,
  staticSPHorizontalPCColumnViewMorePriceShopHtml,
  staticSPHorizontalPCColumnViewMorePriceNameHtml,
  staticSPHorizontalPCColumnViewMorePriceNameShopHtml,
  staticSPHorizontalPCColumnViewMorePriceNameReviewShopHtml,
  staticSliderPriceShopHtml,
  staticSliderPriceNameHtml,
  staticSliderPriceNameShopHtml,
  staticSliderPriceNameReviewShopHtml,
  staticSPScrollerPCColumnPriceShopHtml,
  staticSPScrollerPCColumnPriceNameHtml,
  staticSPScrollerPCColumnPriceNameShopHtml,
  staticSPScrollerPCColumnPriceNameReviewShopHtml,
} from './static'

import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/AlcorRanking',
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

export const Solo = () => soloHtml
export const ColumnPriceShop = () => staticColumnPriceShopHtml
export const ColumnPriceName = () => staticColumnPriceNameHtml
export const ColumnPriceNameShop = () => staticColumnPriceNameShopHtml
export const ColumnPriceNameReviewShop = () => staticColumnPriceNameReviewShopHtml
export const ColumnViewMorePriceShop = () => staticColumnViewMorePriceShopHtml
export const ColumnViewMorePriceName = () => staticColumnViewMorePriceNameHtml
export const ColumnViewMorePriceNameShop = () => staticColumnViewMorePriceNameShopHtml
export const ColumnViewMorePriceNameReviewShop = () => staticColumnViewMorePriceNameReviewShopHtml
export const SPHorizontalPCColumnPriceShop = () => staticSPHorizontalPCColumnPriceShopHtml
export const SPHorizontalPCColumnPriceName = () => staticSPHorizontalPCColumnPriceNameHtml
export const SPHorizontalPCColumnPriceNameShop = () => staticSPHorizontalPCColumnPriceNameShopHtml
export const SPHorizontalPCColumnPriceNameReviewShop = () => staticSPHorizontalPCColumnPriceNameReviewShopHtml
export const SPHorizontalPCColumnViewMorePriceShop = () => staticSPHorizontalPCColumnViewMorePriceShopHtml
export const SPHorizontalPCColumnViewMorePriceName = () => staticSPHorizontalPCColumnViewMorePriceNameHtml
export const SPHorizontalPCColumnViewMorePriceNameShop = () => staticSPHorizontalPCColumnViewMorePriceNameShopHtml
export const SPHorizontalPCColumnViewMorePriceNameReviewShop = () =>
  staticSPHorizontalPCColumnViewMorePriceNameReviewShopHtml
export const SliderPriceShop = () => staticSliderPriceShopHtml
export const SliderPriceName = () => staticSliderPriceNameHtml
export const SliderPriceNameShop = () => staticSliderPriceNameShopHtml
export const SliderPriceNameReviewShop = () => staticSliderPriceNameReviewShopHtml
export const SPScrollerPCColumnPriceShop = () => staticSPScrollerPCColumnPriceShopHtml
export const SPScrollerPCColumnPriceName = () => staticSPScrollerPCColumnPriceNameHtml
export const SPScrollerPCColumnPriceNameShop = () => staticSPScrollerPCColumnPriceNameShopHtml
export const SPScrollerPCColumnPriceNameReviewShop = () => staticSPScrollerPCColumnPriceNameReviewShopHtml
