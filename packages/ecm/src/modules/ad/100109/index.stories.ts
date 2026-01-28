import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import pc4columnHtml from './pc-4column.html?raw'
import pc5columnHtml from './pc-5column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100109',
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
export const Ad100109Solo = () => soloHtml
export const Ad100109Pc4Column = () => pc4columnHtml
export const Ad100109Pc5Column = () => pc5columnHtml
