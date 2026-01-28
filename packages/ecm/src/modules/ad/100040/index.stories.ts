import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import ad100040SpListPc3ColumnHtml from './sp-list_pc-3column.html?raw'
import ad100040SpListPc4ColumnHtml from './sp-list_pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100040',
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
export const Ad100040Solo = () => soloHtml
export const Ad100040SpListPc3Column = () => ad100040SpListPc3ColumnHtml
export const Ad100040SpListPc4Column = () => ad100040SpListPc4ColumnHtml
