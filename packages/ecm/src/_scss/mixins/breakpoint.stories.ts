import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import './breakpoint.dev.scss'

const Story: Meta = {
  title: 'Dev/Breakpoints',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()
      })

      const updateVw = () => {
        const vw = document.getElementById('vw')
        if (vw) vw.innerHTML = `${window.innerWidth}px`
      }

      window.addEventListener('DOMContentLoaded', updateVw)
      window.addEventListener('resize', updateVw)
      return story()
    },
  ],
}

export default Story

export const Default = () => `
<p id="vw" class="text-lg font-weight-bold mb-16"></p>

<div class="d-grid d-grid-gap-8 color-white">
  <div class="text-center xs-only">xs-only</div>
  <div class="text-center sm-only">sm-only</div>
  <div class="text-center md-only">md-only</div>
  <div class="text-center lg-only">lg-only</div>

  <div class="text-center xs-down">xs-down</div>
  <div class="text-center sm-down">sm-down</div>
  <div class="text-center md-down">md-down</div>
  <div class="text-center lg-down">lg-down</div>
  <div class="text-center xl-down">xl-down</div>

  <div class="text-center xs-up">xs-up</div>
  <div class="text-center sm-up">sm-up</div>
  <div class="text-center md-up">md-up</div>
  <div class="text-center lg-up">lg-up</div>
  <div class="text-center xl-up">xl-up</div>
</div>
`
