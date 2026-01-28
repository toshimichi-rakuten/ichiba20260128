import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import ad100020Pc3ColumnHtml from './pc-3column.html?raw'
import ad100020Pc4ColumnHtml from './pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100020',
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
export const Ad100020Solo = () => soloHtml
export const Ad100020Pc3column = () => ad100020Pc3ColumnHtml
export const Ad100020Pc4column = () => ad100020Pc4ColumnHtml
