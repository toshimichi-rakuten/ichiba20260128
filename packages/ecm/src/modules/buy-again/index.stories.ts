import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import defaultHtml from './default.html?raw'
import default704Html from './default704.html?raw'
import defaultSpHtml from './default_sp.html?raw'

const Story: Meta = {
  title: 'Modules/BuyAgain',
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
export const Default704 = () => default704Html
export const DefaultSp = () => defaultSpHtml
