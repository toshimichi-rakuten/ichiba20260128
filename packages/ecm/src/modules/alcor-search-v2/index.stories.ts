import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

import {
  soloListHtml,
  soloEllipseHtml,
  soloDefaultWithTextHtml,
  soloListWithTextHtml,
  soloListTopTitleWithTextHtml,
} from './static'

const Story: Meta = {
  title: 'Modules/AlcorSearch v2',
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

export const SoloList = () => soloListHtml
export const SoloEllipse = () => soloEllipseHtml
export const SoloDefaultWithText = () => soloDefaultWithTextHtml
export const SoloListWithText = () => soloListWithTextHtml
export const SoloListTopTitleWithText = () => soloListTopTitleWithTextHtml
