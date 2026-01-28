import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import leftIconHtml from './left-icon.html?raw'
import rightIconHtml from './right-icon.html?raw'
import bothIconHtml from './both-icon.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Button',
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
export const LeftIcon = () => leftIconHtml
export const RightIcon = () => rightIconHtml
export const BothIcon = () => bothIconHtml
