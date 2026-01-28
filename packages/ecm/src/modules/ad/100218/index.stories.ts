import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import pc2columnHtml from './pc-2column.html?raw'
import pc3columnHtml from './pc-3column.html?raw'
import pc4columnHtml from './pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100218',
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
export const Ad100218Solo = () => soloHtml
export const Ad100218Pc2Column = () => pc2columnHtml
export const Ad100218Pc3Column = () => pc3columnHtml
export const Ad100218Pc4Column = () => pc4columnHtml
