import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'

import { soloHtml, staticSP1columnPC1columnHtml } from './'

const Story: Meta = {
  title: 'Modules/Ad/100214',
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
export const Ad100214Solo = () => soloHtml
export const Ad100214 = () => staticSP1columnPC1columnHtml
