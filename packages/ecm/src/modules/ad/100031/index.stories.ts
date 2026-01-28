import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import ad100031Pc3ColumnHtml from './pc-3column.html?raw'
import ad100031Pc4ColumnHtml from './pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100031',
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
export const Ad100031Solo = () => soloHtml
export const Ad100031Pc3column = () => ad100031Pc3ColumnHtml
export const Ad100031Pc4column = () => ad100031Pc4ColumnHtml
