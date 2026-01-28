import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import hiddenHtml from './hidden.html?raw'
import closeHtml from './close.html?raw'
import thresholdHtml from './threshold.html?raw'
import bodyLockHtml from './body_lock.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Floating',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()

        const resize = document.getElementById('resize')
        if (resize) {
          // Simulate CLS
          resize.style.height = '1000px'
        }
      })

      return story()
    },
  ],
}

export default Story

export const Default = () => defaultHtml
export const Hidden = () => hiddenHtml
export const Close = () => closeHtml
export const Threshold = () => thresholdHtml
export const BodyLock = () => bodyLockHtml
