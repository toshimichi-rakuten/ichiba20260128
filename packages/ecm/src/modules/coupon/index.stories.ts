import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import twoHtml from './two.html?raw'
import threeHtml from './three.html?raw'
import fourHtml from './four.html?raw'
import fiveHtml from './five.html?raw'
import centerOneHtml from './center-one.html?raw'
import centerTwoHtml from './center-two.html?raw'
import centerThreeHtml from './center-three.html?raw'
import afterHtml from './after.html?raw'

import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/Coupon',
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
export const Two = () => twoHtml
export const Three = () => threeHtml
export const Four = () => fourHtml
export const Five = () => fiveHtml
export const CenterOne = () => centerOneHtml
export const CenterTwo = () => centerTwoHtml
export const CenterThree = () => centerThreeHtml
export const After = () => afterHtml
