import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import soloHtml from './solo.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

import {
  staticColumnPriceHtml,
  staticColumnPriceNameHtml,
  staticColumnPriceNameShopHtml,
  staticColumnPriceNameReviewShopHtml,
  staticSPHorizontalPCColumnPriceHtml,
  staticSPHorizontalPCColumnPriceNameHtml,
  staticSPHorizontalPCColumnPriceNameShopHtml,
  staticSPHorizontalPCColumnPriceNameReviewShopHtml,
  staticSliderPriceHtml,
  staticSliderPriceNameHtml,
  staticSliderPriceNameShopHtml,
  staticSliderPriceNameReviewShopHtml,
  staticSlider2PriceHtml,
  staticSlider2PriceNameHtml,
  staticSlider2PriceNameShopHtml,
  staticSlider2PriceNameReviewShopHtml,
} from './static'

const Story: Meta = {
  title: 'Modules/AlcorNormal',
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
export const ColumnPrice = () => staticColumnPriceHtml
export const ColumnPriceName = () => staticColumnPriceNameHtml
export const ColumnPriceNameShop = () => staticColumnPriceNameShopHtml
export const ColumnPriceNameReviewShop = () => staticColumnPriceNameReviewShopHtml
export const SPHorizontalPCColumnPrice = () => staticSPHorizontalPCColumnPriceHtml
export const SPHorizontalPCColumnPriceName = () => staticSPHorizontalPCColumnPriceNameHtml
export const SPHorizontalPCColumnPriceNameShop = () => staticSPHorizontalPCColumnPriceNameShopHtml
export const SPHorizontalPCColumnPriceNameReviewShop = () => staticSPHorizontalPCColumnPriceNameReviewShopHtml
export const SliderPrice = () => staticSliderPriceHtml
export const SliderPriceName = () => staticSliderPriceNameHtml
export const SliderPriceNameShop = () => staticSliderPriceNameShopHtml
export const SliderPriceNameReviewShop = () => staticSliderPriceNameReviewShopHtml
export const Slider2Price = () => staticSlider2PriceHtml
export const Slider2PriceName = () => staticSlider2PriceNameHtml
export const Slider2PriceNameShop = () => staticSlider2PriceNameShopHtml
export const Slider2PriceNameReviewShop = () => staticSlider2PriceNameReviewShopHtml
