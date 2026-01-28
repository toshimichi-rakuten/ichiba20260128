import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import aboveDemoHtml from './above_demo.html?raw'
import rightDemoHtml from './right_demo.html?raw'
import iconAboveDemoHtml from './icon-above_demo.html?raw'
import iconRightDemoHtml from './icon-right_demo.html?raw'
import iconAboveMenuDemoHtml from './icon-above-menu_demo.html?raw'
import iconRightMenuDemoHtml from './icon-right-menu_demo.html?raw'
import buttonAboveDemoHtml from './button-above_demo.html?raw'
import buttonRightDemoHtml from './button-right_demo.html?raw'
import scrollAboveDemoHtml from './scroll-above_demo.html?raw'
import scrollAboveIconDemoHtml from './scroll-above-icon_demo.html?raw'
import scrollRightIconDemoHtml from './scroll-right-icon_demo.html?raw'
import scrollRightDemoHtml from './scroll-right_demo.html?raw'

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
export const AboveDemo = () => aboveDemoHtml
export const RightDemo = () => rightDemoHtml
export const IconRightDemo = () => iconRightDemoHtml
export const IconAboveDemo = () => iconAboveDemoHtml
export const IconAboveMenuDemo = () => iconAboveMenuDemoHtml
export const IconRightMenuDemo = () => iconRightMenuDemoHtml
export const ButtonAboveDemo = () => buttonAboveDemoHtml
export const ButtonRightDemo = () => buttonRightDemoHtml
export const ScrollAboveDemo = () => scrollAboveDemoHtml
export const ScrollAboveIconDemo = () => scrollAboveIconDemoHtml
export const ScrollRightIconDemo = () => scrollRightIconDemoHtml
export const ScrollRightDemo = () => scrollRightDemoHtml
