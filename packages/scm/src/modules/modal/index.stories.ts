import { Meta } from '@storybook/html'
import staticButtonHtml from './static-button.html?raw'
import floatingButtonHtml from './floating-button.html?raw'
import { useEffect } from '@storybook/addons'
import { ECM } from 'ecm/src/core'
import 'ecm/src/core/index.scss'
import '../../index.scss'
import '../../utils.scss'
import '../../utils_md.scss'
import '../../utils_lg.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'

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
export const StaticButton = () => staticButtonHtml
export const FloatingButton = () => `
<div style="height: 1500px">👇👇👇 Scroll 👇👇👇</div>
${floatingButtonHtml}
`
