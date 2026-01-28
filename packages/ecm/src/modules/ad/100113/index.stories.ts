import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'

import { soloHtml, staticSP1columnPC2columnHtml, staticSP1columnPC3columnHtml, staticSP1columnPC4columnHtml } from './'

const Story: Meta = {
  title: 'Modules/Ad/100113',
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
export const Ad100113Solo = () => soloHtml
export const Ad100113Sp1ColumnPc2Column = () => staticSP1columnPC2columnHtml
export const Ad100113Sp1ColumnPc3Column = () => staticSP1columnPC3columnHtml
export const Ad100113Sp1ColumnPc4Column = () => staticSP1columnPC4columnHtml
