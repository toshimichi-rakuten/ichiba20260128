import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import staticSp2ColumnPc2columnHtml from './sp-2column_pc-2column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100523',
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
export const Ad100523Solo = () => soloHtml
export const Ad100523Sp2ColumnPc2column = () => staticSp2ColumnPc2columnHtml
