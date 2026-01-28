import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import soloSpHorizontalHtml from './solo_sp-horizontal.html?raw'
import ad100013SpColumnPc3columnHtml from './sp-column_pc-3column.html?raw'
import ad100013SpColumnPc4columnHtml from './sp-column_pc-4column.html?raw'
import ad100013SpListPc3columnHtml from './sp-list_pc-3column.html?raw'
import ad100013SpListPc4columnHtml from './sp-list_pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100013',
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
export const Ad100013Solo = () => soloHtml
export const Ad100013SoloSpHorizontal = () => soloSpHorizontalHtml
export const Ad100013SpColumnPc3column = () => ad100013SpColumnPc3columnHtml
export const Ad100013SpColumnPc4column = () => ad100013SpColumnPc4columnHtml
export const Ad100013SpListPc3column = () => ad100013SpListPc3columnHtml
export const Ad100013SpListPc4column = () => ad100013SpListPc4columnHtml
