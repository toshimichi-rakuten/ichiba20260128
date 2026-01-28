import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import rowHtml from './row.html?raw'
import columnHtml from './column.html?raw'
import wrapHtml from './wrap.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Flex',
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

export const Row = () => rowHtml
export const Column = () => columnHtml
export const Wrap = () => wrapHtml
