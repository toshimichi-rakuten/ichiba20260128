import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import aboveHtml from './above.html?raw'
import belowHtml from './below.html?raw'
import fullscreenHtml from './full-screen.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Sheet',
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

export const Above = () => aboveHtml
export const Below = () => belowHtml
export const FullScreen = () => fullscreenHtml
