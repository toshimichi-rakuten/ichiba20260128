import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'

import staticHorizontal from './static_horizontal.html?raw'
import staticVertical from './static_vertical.html?raw'
import staticVertical2Column from './static_vertical_2col.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100165',
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

export const Ad100165Horizontal = () => staticHorizontal
export const Ad100165Vertical = () => staticVertical
export const Ad100165Vertical2Column = () => staticVertical2Column
