import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import soloSpHorizontalHtml from './solo_sp-horizontal.html?raw'
import ad100010SpColumnPc3columnHtml from './sp-column_pc-3column.html?raw'
import ad100010SpColumnPc4columnHtml from './sp-column_pc-4column.html?raw'
import ad100010SplistPc3columnHtml from './sp-list_pc-3column.html?raw'
import ad100010SplistPc4columnHtml from './sp-list_pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100010',
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
export const Ad100010Solo = () => soloHtml
export const Ad100010SoloSpHorizontal = () => soloSpHorizontalHtml
export const Ad100010SpColumnPc3column = () => ad100010SpColumnPc3columnHtml
export const Ad100010SpColumnPc4column = () => ad100010SpColumnPc4columnHtml
export const Ad100010SpListPc3column = () => ad100010SplistPc3columnHtml
export const Ad100010SpListPc4column = () => ad100010SplistPc4columnHtml
