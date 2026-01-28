import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import defaultHtml from './default.html?raw'
import default704Html from './default-704.html?raw'
import defaultWithTabHtml from './default-with-tab.html?raw'
import defaultWithTab704Html from './default-with-tab-704.html?raw'
import defaultSpHtml from './default-sp.html?raw'
import defaultSpWithTabHtml from './default-sp-with-tab.html?raw'

const Story: Meta = {
  title: 'Modules/DU Ranking',
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
export const DefaultWithTab = () => defaultWithTabHtml
export const DefaultWithTab704 = () => defaultWithTab704Html
export const DefaultSp = () => defaultSpHtml
export const DefaultSpWithTab = () => defaultSpWithTabHtml
