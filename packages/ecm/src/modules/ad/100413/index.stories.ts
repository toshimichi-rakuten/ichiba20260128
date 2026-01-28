import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloBadgeHtml from './solo-badge.html?raw'
import soloTextHtml from './solo-text.html?raw'
import staticBadgeSp1ColumnPcListHtml from './badge-sp-1column_pc-list.html?raw'
import staticTextSp1ColumnPcListHtml from './text-sp-1column_pc-list.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100413',
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
export const Ad100413SoloBadge = () => soloBadgeHtml
export const Ad100413SoloText = () => soloTextHtml
export const Ad100413BadgeSp1ColumnPcList = () => staticBadgeSp1ColumnPcListHtml
export const Ad100413TextSp1ColumnPcList = () => staticTextSp1ColumnPcListHtml
