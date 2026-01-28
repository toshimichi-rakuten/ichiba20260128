import { Meta } from '@storybook/html'
import defaultHtml from './index.html?raw'
import soloHtml from './solo.html?raw'

import 'ecm/src/core/index.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'
import '../../../index.scss'
import '../../../utils.scss'
import '../../../utils_md.scss'
import '../../../utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Ad/100536',
  decorators: [
    (story) => {
      return story()
    },
  ],
}

export default Story
export const Default = () => defaultHtml
export const Solo = () => soloHtml
