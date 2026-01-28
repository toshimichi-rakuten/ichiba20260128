import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import ad100210Sp2ColumnPc2ColumnHtml from './sp-2column_pc-2column.html?raw'
import ad100210Sp2ColumnPc3ColumnHtml from './sp-2column_pc-3column.html?raw'
import ad100210Sp2ColumnPc4ColumnHtml from './sp-2column_pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100210',
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
export const Ad100210Solo = () => soloHtml
export const Ad100210Sp2ColumnPc2ColumnHtml = () => ad100210Sp2ColumnPc2ColumnHtml
export const Ad100210Sp2ColumnPc3ColumnHtml = () => ad100210Sp2ColumnPc3ColumnHtml
export const Ad100210Sp2ColumnPc4ColumnHtml = () => ad100210Sp2ColumnPc4ColumnHtml
