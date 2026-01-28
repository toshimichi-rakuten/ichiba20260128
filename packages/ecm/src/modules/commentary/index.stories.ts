import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import headlineHtml from './headline.html?raw'
import defaultHtml from './default.html?raw'

const Story: Meta = {
  title: 'Modules/Commentary',
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
export const Headline = () => headlineHtml
export const Default = () => defaultHtml
