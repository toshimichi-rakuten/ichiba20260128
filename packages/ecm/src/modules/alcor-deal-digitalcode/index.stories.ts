import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

import { staticSoloTemplate, staticSP2columnPC4column } from './static'

const Story: Meta = {
  title: 'Modules/AlcorDealDigitalcode',
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

export const Solo = () => staticSoloTemplate
export const SP2PC4 = () => staticSP2columnPC4column
