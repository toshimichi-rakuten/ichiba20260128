import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import soloSpHorizontalHtml from './solo_sp-horizontal.html?raw'
import ad100017SpColumnPc3columnHtml from './sp-column_pc-3column.html?raw'
import ad100017SpColumnPc4columnHtml from './sp-column_pc-4column.html?raw'
import ad100017SpListPc3columnHtml from './sp-list_pc-3column.html?raw'
import ad100017SpListPc4columnHtml from './sp-list_pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100017',
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
export const Ad100017Solo = () => soloHtml
export const Ad100017SoloSpHorizontal = () => soloSpHorizontalHtml
export const Ad100017SpColumnPc3column = () => ad100017SpColumnPc3columnHtml
export const Ad100017SpColumnPc4column = () => ad100017SpColumnPc4columnHtml
export const Ad100017SpListPc3column = () => ad100017SpListPc3columnHtml
export const Ad100017SpListPc4column = () => ad100017SpListPc4columnHtml
