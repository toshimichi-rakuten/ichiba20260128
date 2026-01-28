import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import soloHorizontalHtml from './solo_horizontal.html?raw'
import ad100066ListHtml from './list.html?raw'
import ad100066ColumnHtml from './column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100066',
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
export const Ad100066SoloColumn = () => soloHtml
export const Ad100066SoloList = () => soloHorizontalHtml
export const Ad100066Column = () => ad100066ColumnHtml
export const Ad100066List = () => ad100066ListHtml
