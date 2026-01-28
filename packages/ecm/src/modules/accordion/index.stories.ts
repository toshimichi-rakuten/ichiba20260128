import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import multipleHtml from './multiple.html?raw'
import unstyledHtml from './unstyled.html?raw'
import mdDisabledHtml from './md-disabled.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Accordion',
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
export const Multiple = () => multipleHtml
export const Unstyled = () => unstyledHtml
export const MdDisabled = () => mdDisabledHtml
