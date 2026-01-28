import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import normalHtml from './index_normal.html?raw'
import couponHtml from './index_coupon.html?raw'
import dealHtml from './index_deal.html?raw'
import manufactureHtml from './index_manufacture.html?raw'
import rankingHtml from './index_ranking.html?raw'
import roomHtml from './index_room.html?raw'
import soloHtml from './solo.html?raw'
import extraHtml from './extra.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Alcor',
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

export const Normal = () => normalHtml
export const Coupon = () => couponHtml
export const Deal = () => dealHtml
export const Manufacture = () => manufactureHtml
export const Ranking = () => rankingHtml
export const Room = () => roomHtml
export const Solo = () => soloHtml
export const Extra = () => extraHtml
