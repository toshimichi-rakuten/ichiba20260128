import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import fadeinShortDemoHtml from './fade-in-short_demo.html?raw'
import fadeinLongDemoHtml from './fade-in-long_demo.html?raw'
import slideUpShortDemoHtml from './slide-up-short_demo.html?raw'
import slideUpLongHtml from './slide-up-long.html?raw'
import defaultOpenDemoHtml from './default-open_demo.html?raw'
import overlayOnlyHtml from './overlay-only.html?raw'
import noAnimationDemoHtml from './no-animation_demo.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Modal',
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

export const FadeInShortDemo = () => fadeinShortDemoHtml
export const FadeInLongDemo = () => fadeinLongDemoHtml
export const SlideUpShortDemo = () => slideUpShortDemoHtml
export const SlideUpLong = () => slideUpLongHtml
export const DefaultOpenDemo = () => defaultOpenDemoHtml
export const OverlayOnly = () => overlayOnlyHtml
export const NoAnimationDemo = () => noAnimationDemoHtml
