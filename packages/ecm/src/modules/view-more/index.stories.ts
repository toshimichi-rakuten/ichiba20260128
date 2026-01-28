import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import sessionHtml from './session.html?raw'
import closeHtml from './close.html?raw'
import closeSmoothHtml from './close-smooth.html?raw'
import responsiveHtml from './responsive.html?raw'
import openIfNoHiddenHtml from './open_if_no_hidden.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/ViewMore',
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
export const Session = () => sessionHtml
export const Close = () => closeHtml
export const CloseSmooth = () => closeSmoothHtml
export const Responsive = () => responsiveHtml
export const OpenIfNoHidden = () => openIfNoHiddenHtml
