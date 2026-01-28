import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import initHtml from './init.html?raw'
import eventSingleHtml from './event_single.html?raw'
import eventBlockHtml from './event_block.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const renderFruits = () => {
  const arr = ['apples', 'orange', 'strawberry', 'melon', 'pineapple']

  const arrHtml = arr
    .map((el) => {
      return `
      <li aria-hidden="true" class="ecm-view-more-item">${el}</li>
    `
    })
    .join('')

  const html = `
    <ul
      class="mb-4"
      data-module-name="ecm-view-more"
      data-visible="2"
      data-session="false"
      id="view-more-1"
    >
      ${arrHtml}
    </ul>

    <button class="ecm-view-more-button" aria-controls="view-more-1" aria-expanded="false">
      もっと見る
    </button>
  `

  const div = document.getElementById('dynamic')

  if (div) {
    div.innerHTML = html
  }
}

const Story: Meta = {
  title: 'Modules/DynamicContent',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()
        renderFruits()
      })

      return story()
    },
  ],
}

export default Story

export const Default = () => defaultHtml
export const Init = () => initHtml
export const EventSingle = () => eventSingleHtml
export const EventBlock = () => eventBlockHtml
