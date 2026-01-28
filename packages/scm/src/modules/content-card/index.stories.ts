import { Meta } from '@storybook/html'
import defaultHtml from './default.html?raw'
import defaultSoloHtml from './default-solo.html?raw'
import tagHtml from './tag.html?raw'
import tagSoloHtml from './tag-solo.html?raw'
import paddedHtml from './padded.html?raw'
import bannerHtml from './banner.html?raw'
import horizontalHtml from './horizontal.html?raw'
import horizontalSmallHtml from './horizontal-small.html?raw'
import horizontalSoloHtml from './horizontal-solo.html?raw'
import guideHtml from './guide.html?raw'
import { useEffect } from '@storybook/addons'
import { ECM } from 'ecm/src/core'
import 'ecm/src/core/index.scss'
import '../../index.scss'
import '../../utils.scss'
import '../../utils_md.scss'
import '../../utils_lg.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/ContentCard',
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
export const DefaultSolo = () => defaultSoloHtml
export const Tag = () => tagHtml
export const TagSolo = () => tagSoloHtml
export const Padded = () => paddedHtml
export const Banner = () => bannerHtml
export const Horizontal = () => horizontalHtml
export const HorizontalSmall = () => horizontalSmallHtml
export const HorizontalSolo = () => horizontalSoloHtml
export const Guide = () => guideHtml
