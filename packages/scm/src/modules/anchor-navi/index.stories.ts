import { Meta } from '@storybook/html'
import referenceHtml from './reference.html?raw'
import column4Html from './column4_demo.html?raw'
import column3Html from './column3_demo.html?raw'
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
  title: 'Modules/AnchorNavi',
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
export const Reference = () => referenceHtml
export const Column4 = () => column4Html
export const Column3 = () => column3Html
