import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import allConfigHtml from './all-config.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import floatingBannerHtml from './floating-banner.html?raw'
import floatingBannerPreserveHtml from './floating-banner-preserve.html?raw'
import floatingBannerSameHtml from './floating-banner-same.html?raw'
import paginationHtml from './pagination.html?raw'
import overflowHtml from './overflow.html?raw'
import tabbedHtml from './tabbed.html?raw'
import dynamicSlidesHtml from './dynamic_slides.html?raw'

const Story: Meta = {
  title: 'Modules/Slider',
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

export const Default = () => defaultHtml
export const AllConfig = () => allConfigHtml
export const Pagination = () => paginationHtml
export const FloatingBanner = () => floatingBannerHtml
export const FloatingPreserveBanner = () => floatingBannerPreserveHtml
export const FloatingSameBanner = () => floatingBannerSameHtml
export const OverflowContainer = () => overflowHtml
export const Tabbed = () => tabbedHtml
export const DynamicSlides = () => dynamicSlidesHtml
