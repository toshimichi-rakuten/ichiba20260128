import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import ad100021Pc3ColumnHtml from './pc-3column.html?raw'
import ad100021Pc4ColumnHtml from './pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100021',
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
export const Ad100021Solo = () => soloHtml
export const Ad100021Pc3column = () => ad100021Pc3ColumnHtml
export const Ad100021Pc4column = () => ad100021Pc4ColumnHtml
