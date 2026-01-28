import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import soloPcHorizontalHtml from './solo-pc-horizontal.html?raw'
import soloTopHtml from './solo-top.html?raw'
import staticSp1ColumnPc2ColumnHtml from './sp-1column_pc-2column.html?raw'
import staticSp1ColumnPcListHtml from './sp-1column_pc-list.html?raw'
import staticSpScrollPc4ColumnHtml from './sp-scroll_pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100402',
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
export const Ad100402Solo = () => soloHtml
export const Ad100402SoloPcHorizontal = () => soloPcHorizontalHtml
export const Ad100402SoloTop = () => soloTopHtml
export const Ad100402Sp1ColumnPc2Column = () => staticSp1ColumnPc2ColumnHtml
export const Ad100402Sp1ColumnPcList = () => staticSp1ColumnPcListHtml
export const Ad100402SpScrollPc4Column = () => staticSpScrollPc4ColumnHtml
