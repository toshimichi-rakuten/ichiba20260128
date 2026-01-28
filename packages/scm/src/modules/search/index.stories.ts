import { Meta } from '@storybook/html'
import defaultHtml from './default.html?raw'
import selectionHtml from './selection.html?raw'
import selectionKeywordHtml from './selection-keyword.html?raw'
import selectionKeywordListHtml from './selection-keyword-list.html?raw'
import { useEffect } from '@storybook/addons'
import { ECM } from 'ecm/src/core'
import 'ecm/src/core/index.scss'
import '../../index.scss'
import '../../utils.scss'
import '../../utils_md.scss'
import '../../utils_lg.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'

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
