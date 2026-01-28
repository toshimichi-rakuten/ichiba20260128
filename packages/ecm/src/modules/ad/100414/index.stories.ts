import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloBadgeHtml from './solo-badge.html?raw'
import soloTextHtml from './solo-text.html?raw'
import staticBadgeSp1ColumnPc2columnHtml from './badge-sp-1column_pc-2column.html?raw'
import staticTextSp1ColumnPc2columnHtml from './text-sp-1column_pc-2column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100414',
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
export const Ad100414SoloBadge = () => soloBadgeHtml
export const Ad100414SoloText = () => soloTextHtml
export const Ad100414BadgeSp1ColumnPc2column = () => staticBadgeSp1ColumnPc2columnHtml
export const Ad100414TextSp1ColumnPc2column = () => staticTextSp1ColumnPc2columnHtml
