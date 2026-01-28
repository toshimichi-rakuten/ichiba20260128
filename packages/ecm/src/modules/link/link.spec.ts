import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Link',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-link--default`,
  device: 'sp',
})

snapshot({
  name: 'Link Gray',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-link--gray`,
  device: 'sp',
})
