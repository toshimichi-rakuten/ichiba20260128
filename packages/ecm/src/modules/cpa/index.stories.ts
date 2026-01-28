import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import spHorizontalHtml from './static/sp-horizontal.html?raw'
import spHorizontalFreeShippingHtml from './static/sp-horizontal-free-shipping.html?raw'
import sliderHtml from './static/slider.html?raw'
import sliderFreeShippingHtml from './static/slider-free-shipping.html?raw'
import pcFourHtml from './static/pc-four.html?raw'
import pcFourFreeShippingHtml from './static/pc-four-free-shipping.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Cpa',
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

export const SpHorizontal = () => spHorizontalHtml
export const SpHorizontalFreeShipping = () => spHorizontalFreeShippingHtml
export const Slider = () => sliderHtml
export const SliderFreeShipping = () => sliderFreeShippingHtml
export const PcFour = () => pcFourHtml
export const PcFourFreeShipping = () => pcFourFreeShippingHtml
