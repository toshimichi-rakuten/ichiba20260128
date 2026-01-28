import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import defaultHtml from './default.html?raw'
import withtextHtml from './with-text.html?raw'
import sliderHtml from './slider.html?raw'

const Story: Meta = {
  title: 'Modules/Kanban',
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
export const Default = () => defaultHtml
export const WithText = () => withtextHtml
export const Slider = () => sliderHtml
