import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'

import { soloHtml, staticSP1columnPC2columnHtml } from './'

const Story: Meta = {
  title: 'Modules/Ad/100061',
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
export const Ad100061Solo = () => soloHtml
export const Ad100061Sp1ColumnPc2Column = () => staticSP1columnPC2columnHtml
