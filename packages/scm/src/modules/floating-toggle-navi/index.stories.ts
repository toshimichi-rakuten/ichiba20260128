import { Meta } from '@storybook/html'
import defaultHtml from './default_demo.html?raw'
import borderedHtml from './bordered.html?raw'
import anchorHtml from './anchor.html?raw'
import anchorBorderedHtml from './anchor-bordered.html?raw'
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
  title: 'Modules/FloatingToggleNavi',
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
export const Bordered = () => borderedHtml
export const Anchor = () => anchorHtml
export const AnchorBordered = () => anchorBorderedHtml
