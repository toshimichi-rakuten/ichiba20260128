import { Meta } from '@storybook/html'
import ad100293Html from './index.html?raw'
import ad100293HtmlColumn from './column.html?raw'
import ad100293HtmlSolo from './solo.html?raw'
import ad100293HtmlColorDemo from './color-demo.html?raw'
import 'ecm/src/core/index.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'
import '../../../index.scss'
import '../../../utils.scss'
import '../../../utils_md.scss'
import '../../../utils_lg.scss'

const Story: Meta = {
  title: 'Modules/AD/100293',
  decorators: [
    (story) => {
      return story()
    },
  ],
}

export default Story
export const Default = () => ad100293Html
export const Solo = () => ad100293HtmlSolo
export const Column = () => ad100293HtmlColumn
export const ColorDemo = () => ad100293HtmlColorDemo
