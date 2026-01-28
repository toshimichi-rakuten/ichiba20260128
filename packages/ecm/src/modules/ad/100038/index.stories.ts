import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import ad100038Pc2ColumnHtml from './pc-2column.html?raw'
import ad100038Pc3ColumnHtml from './pc-3column.html?raw'
import ad100038Pc4ColumnHtml from './pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100038',
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
export const Ad100038Solo = () => soloHtml
export const Ad100038Pc2Column = () => ad100038Pc2ColumnHtml
export const Ad100038Pc3Column = () => ad100038Pc3ColumnHtml
export const Ad100038Pc4Column = () => ad100038Pc4ColumnHtml
