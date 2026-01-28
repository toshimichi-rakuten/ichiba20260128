import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import indexHtml from './index.html?raw'
import externalScriptHtml from './external_script.html?raw'
import { ECM } from 'ecm/src/core'
import { FET } from '../../fet'
import 'ecm/src/core/index.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'

const Story: Meta = {
  title: 'Plugins/PersonalizedDisplay',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()

        new FET()

        const buttonGrid = document.getElementById('button-grid')!
        const buttons = buttonGrid.querySelectorAll('button')
        const container = document.querySelector('[data-personalized-display-id="colors"]')!

        for (let button of buttons) {
          button.addEventListener('click', () => {
            if (button.getAttribute('data-disabled') === 'true') {
              return
            }

            const type = button.getAttribute('data-type')!

            const newColor = document.createElement('div')
            newColor.setAttribute('data-type', type)
            container.appendChild(newColor)

            for (let b of buttons) {
              b.setAttribute('data-disabled', 'true')
              b.classList.add('bg-color-gray-5!')
            }
          })
        }
      })

      return story()
    },
  ],
}

export default Story

export const Default = () => indexHtml

export const ExternalScript = () => externalScriptHtml
