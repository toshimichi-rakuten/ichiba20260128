import { Meta } from '@storybook/html'
import singleHtml from './single_demo.html?raw'
import multipleHtml from './multiple_demo.html?raw'
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
  title: 'Modules/FloatingBanner',
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
export const Single = () => singleHtml
export const Multiple = () => multipleHtml
