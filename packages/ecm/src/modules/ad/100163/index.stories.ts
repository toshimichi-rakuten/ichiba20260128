import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'

import {
  soloVerticalHtml,
  staticVerticalSP1columnPC2columnHtml,
  soloHorizontalHtml,
  staticHorizontalSP1columnPC2columnHtml,
} from './'

const Story: Meta = {
  title: 'Modules/Ad/100163',
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

export const Ad100163SoloVertical = () => soloVerticalHtml
export const Ad100163SoloVerticalGrid = () => staticVerticalSP1columnPC2columnHtml
export const Ad100163SoloHorizontal = () => soloHorizontalHtml
export const Ad100163SoloHorizontalGrid = () => staticHorizontalSP1columnPC2columnHtml
