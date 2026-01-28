import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import sliderHtml from './slider.html?raw'
import gridHtml from './grid.html?raw'
import slider704Html from './slider_704.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/SmartCoupon',
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

export const Slider = () => sliderHtml
export const Grid = () => gridHtml
export const Slider704 = () => slider704Html
