import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import selectionHtml from './selection.html?raw'
import selectionKeywordHtml from './selection-keyword.html?raw'
import selectionKeywordListHtml from './selection-keyword-list.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Search',
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

export const Default = () => defaultHtml
export const Selection = () => selectionHtml
export const SelectionKeyword = () => selectionKeywordHtml
export const SelectionKeywordList = () => selectionKeywordListHtml
