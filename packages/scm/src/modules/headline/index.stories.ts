import { Meta } from '@storybook/html'
import headlineHtml from './headline.html?raw'
import subHeadlineHtml from './sub-headline_demo.html?raw'
import descriptionHtml from './description.html?raw'
import allHtml from './all.html?raw'
import 'ecm/src/core/index.scss'
import '../../index.scss'
import '../../utils.scss'
import '../../utils_md.scss'
import '../../utils_lg.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Headline',
  decorators: [
    (story) => {
      return story()
    },
  ],
}

export default Story
export const Headline = () => headlineHtml
export const SubHeadline = () => subHeadlineHtml
export const Description = () => descriptionHtml
export const All = () => allHtml
