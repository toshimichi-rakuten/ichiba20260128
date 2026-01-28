import { Meta } from '@storybook/html'
import defaultHtml from './default.html?raw'
import grayHtml from './gray.html?raw'
import filterHtml from './filter.html?raw'
import filterMultiHtml from './filter-multi.html?raw'
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
  title: 'Modules/GiftSearchIntro',
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
export const Gray = () => grayHtml
export const Filter = () => filterHtml
export const FilterMulti = () => filterMultiHtml
