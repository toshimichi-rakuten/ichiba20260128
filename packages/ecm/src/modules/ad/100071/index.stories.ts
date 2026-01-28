import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHtml from './solo.html?raw'
import soloHorizontalHtml from './solo_horizontal.html?raw'
import ad100071SpListHtml from './sp-list.html?raw'
import ad100071SColumnHtml from './sp-column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100071',
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
export const Ad100071SoloColumn = () => soloHtml
export const Ad100071SoloList = () => soloHorizontalHtml
export const Ad100071SpColumn = () => ad100071SColumnHtml
export const Ad100071SpList = () => ad100071SpListHtml
