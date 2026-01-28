import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultDemoHtml from './default_demo.html?raw'
import dropdownDemoHtml from './dropdown_demo.html?raw'
import chevronDemoHtml from './chevron_demo.html?raw'
import staticDemoHtml from './static_demo.html?raw'
import menuDemoHtml from './menu_demo.html?raw'
import imageDemoHtml from './image_demo.html?raw'
import linkDemoHtml from './link_demo.html?raw'
import hiddenDemoHtml from './hidden_demo.html?raw'
import stickyDemoHtml from './sticky_demo.html?raw'
import dynamicHeightHtml from './dynamic_height.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/FloatingNavi',
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

export const DefaultDemo = () => defaultDemoHtml
export const StaticDemo = () => staticDemoHtml
export const MenuDemo = () => menuDemoHtml
export const DropdownDemo = () => dropdownDemoHtml
export const ChevronDemo = () => chevronDemoHtml
export const ImageDemo = () => imageDemoHtml
export const LinkDemo = () => linkDemoHtml
export const HiddenDemo = () => hiddenDemoHtml
export const StickyDemo = () => stickyDemoHtml
export const DynamicHeightDemo = () => {
  useEffect(() => {
    setTimeout(() => {
      const section = document.getElementById('dynamicHeight')!
      section.style.height = '400px'
    }, 2000)
  }, [])

  return dynamicHeightHtml
}
