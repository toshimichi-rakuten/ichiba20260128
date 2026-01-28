import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'

import {
  soloHtml,
  staticSP1columnPC2columnHtml,
  staticSP1columnPC3columnHtml,
  staticSP1columnPC4columnHtml,
  staticSP2columnPC2columnHtml,
  staticSP2columnPC3columnHtml,
  staticSP2columnPC4columnHtml,
} from './'

const Story: Meta = {
  title: 'Modules/Ad/100030',
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
export const Ad100030Solo = () => soloHtml
export const Ad100030Sp1ColumnPc2Column = () => staticSP1columnPC2columnHtml
export const Ad100030Sp1ColumnPc3Column = () => staticSP1columnPC3columnHtml
export const Ad100030Sp1ColumnPc4Column = () => staticSP1columnPC4columnHtml
export const Ad100030Sp2ColumnPc2Column = () => staticSP2columnPC2columnHtml
export const Ad100030Sp2ColumnPc3Column = () => staticSP2columnPC3columnHtml
export const Ad100030Sp2ColumnPc4Column = () => staticSP2columnPC4columnHtml
