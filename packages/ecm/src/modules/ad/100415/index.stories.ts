import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloBadgeHtml from './solo-badge.html?raw'
import soloBadgePcHorizontalHtml from './solo-badge-pc-horizontal.html?raw'
import soloTextHtml from './solo-text.html?raw'
import soloTextPcHorizontalHtml from './solo-text-pc-horizontal.html?raw'
import staticBadgeSp1ColumnPcListHtml from './badge-sp-1column_pc-list.html?raw'
import staticTextSp1ColumnPcListHtml from './text-sp-1column_pc-list.html?raw'
import staticBadgeSp1ColumnPc2columnHtml from './badge-sp-1column_pc-2column.html?raw'
import staticTextSp1ColumnPc2columnHtml from './text-sp-1column_pc-2column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100415',
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
export const Ad100415SoloBadge = () => soloBadgeHtml
export const Ad100415SoloBadgePcHorizontal = () => soloBadgePcHorizontalHtml
export const Ad100415SoloText = () => soloTextHtml
export const Ad100415SoloTextPcHorizontal = () => soloTextPcHorizontalHtml
export const Ad100415BadgeSp1ColumnPcList = () => staticBadgeSp1ColumnPcListHtml
export const Ad100415TextSp1ColumnPcList = () => staticTextSp1ColumnPcListHtml
export const Ad100415BadgeSp1ColumnPc2column = () => staticBadgeSp1ColumnPc2columnHtml
export const Ad100415TextSp1ColumnPc2column = () => staticTextSp1ColumnPc2columnHtml
