import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import default2colHtml from './default-with-2column.html?raw'
import default4colHtml from './default-with-4column.html?raw'
import default4colHalfHtml from './default-with-4column-half.html?raw'
import cardHtml from './card.html?raw'
import cardImageHtml from './card-image.html?raw'
import unstyledHtml from './unstyled.html?raw'
import nestedHtml from './nested.html?raw'
import eventsHtml from './events.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Tab',
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
export const Default2col = () => default2colHtml
export const Default4col = () => default4colHtml
export const Default4colHalf = () => default4colHalfHtml
export const Card = () => cardHtml
export const CardImage = () => cardImageHtml
export const Unstyled = () => unstyledHtml
export const Nested = () => nestedHtml
export const Events = () => eventsHtml
