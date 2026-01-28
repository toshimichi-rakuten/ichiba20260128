import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Shop SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-shop--default`,
  device: 'sp',
})

snapshot({
  name: 'Shop MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-shop--default`,
  device: 'md',
})
