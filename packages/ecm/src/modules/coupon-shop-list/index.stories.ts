import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import {
  StaticDefaultGridHtml,
  StaticDefaultLinkHtml,
  StaticTabGridHtml,
  StaticTabLinkHtml,
  StaticGenreGridHtml,
  StaticGenreAccordionHtml,
  StaticTabGenreGridHtml,
  StaticTabGenreAccordionHtml,
  StaticFilterHtml,
} from './static'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/CouponShopList',
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

export const DefaultGrid = () => StaticDefaultGridHtml
export const DefaultLink = () => StaticDefaultLinkHtml
export const TabGrid = () => StaticTabGridHtml
export const TabLink = () => StaticTabLinkHtml
export const GenreGrid = () => StaticGenreGridHtml
export const GenreAccordion = () => StaticGenreAccordionHtml
export const TabGenreGrid = () => StaticTabGenreGridHtml
export const TabGenreAccordion = () => StaticTabGenreAccordionHtml
export const Filter = () => StaticFilterHtml
