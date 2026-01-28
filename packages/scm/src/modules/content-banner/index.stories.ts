import { Meta } from '@storybook/html'
import sideHtml from './side.html?raw'
import centerHtml from './center.html?raw'
import panelHtml from './panel.html?raw'
import panelSolidHtml from './panel-solid.html?raw'
import cardHtml from './card.html?raw'
import 'ecm/src/core/index.scss'
import '../../index.scss'
import '../../utils.scss'
import '../../utils_md.scss'
import '../../utils_lg.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/ContentBanner',
  decorators: [
    (story) => {
      return story()
    },
  ],
}

export default Story
export const Side = () => sideHtml
export const Center = () => centerHtml
export const Panel = () => panelHtml
export const PanelSolid = () => panelSolidHtml
export const Card = () => cardHtml
