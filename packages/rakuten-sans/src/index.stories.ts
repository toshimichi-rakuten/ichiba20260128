import { Meta } from '@storybook/html'
import rakutenCondensed from './rakuten_condensed.html?raw'
import rakutenRounded from './rakuten_rounded.html?raw'
import rakutenSerif from './rakuten_serif.html?raw'
import rakutenSerifItalic from './rakuten_serif_italic.html?raw'
import rakutenSansJP2 from './rakuten_sans_jp2.html?raw'
import rakutenSansJP2TN from './rakuten_sans_jp2tn.html?raw'
import './rakuten_condensed.scss'
import './rakuten_rounded.scss'
import './rakuten_sans_jp2_300.scss'
import './rakuten_sans_jp2_400.scss'
import './rakuten_sans_jp2_500.scss'
import './rakuten_sans_jp2_600.scss'
import './rakuten_sans_jp2_700.scss'
import './rakuten_sans_jp2_800.scss'
import './rakuten_sans_jp2tn_300.scss'
import './rakuten_sans_jp2tn_400.scss'
import './rakuten_sans_jp2tn_500.scss'
import './rakuten_sans_jp2tn_600.scss'
import './rakuten_sans_jp2tn_700.scss'
import './rakuten_sans_jp2tn_800.scss'
import './rakuten_serif.scss'

const Story: Meta = {
  title: 'Fonts/RakutenSans',
  decorators: [
    (story) => {
      return story()
    },
  ],
}

export default Story

export const RakutenCondensed = () => rakutenCondensed
export const RakutenRounded = () => rakutenRounded
export const RakutenSerif = () => rakutenSerif
export const RakutenSerifItalic = () => rakutenSerifItalic
export const RakutenSansJP2 = () => rakutenSansJP2
export const RakutenSansJP2TN = () => rakutenSansJP2TN
