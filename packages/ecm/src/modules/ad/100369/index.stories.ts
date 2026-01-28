import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../../core'
import '../../../core/index.scss'
import '../../../core/utils.scss'
import '../../../core/utils_md.scss'
import '../../../core/utils_lg.scss'
import soloHalfHtml from './solo_discount.html?raw'
import soloDiscountHtml from './solo_half.html?raw'
import ad100369Pc2ColumnHtml from './pc-2column.html?raw'
import ad100369Pc3ColumnHtml from './pc-3column.html?raw'
import ad100369Pc4ColumnHtml from './pc-4column.html?raw'

const Story: Meta = {
  title: 'Modules/Ad/100369',
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
export const Ad100369SoloHalf = () => soloHalfHtml
export const Ad100369SoloDiscount = () => soloDiscountHtml
export const Ad100369Pc2Column = () => ad100369Pc2ColumnHtml
export const Ad100369Pc3Column = () => ad100369Pc3ColumnHtml
export const Ad100369Pc4Column = () => ad100369Pc4ColumnHtml
