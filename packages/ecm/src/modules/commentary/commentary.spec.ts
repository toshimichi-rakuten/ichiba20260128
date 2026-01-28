import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Headline SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-commentary--headline`,
  device: 'sp',
})

snapshot({
  name: 'Headline MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-commentary--headline`,
  device: 'md',
})

snapshot({
  name: 'Default SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-commentary--default`,
  device: 'sp',
})

snapshot({
  name: 'Default MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-commentary--default`,
  device: 'md',
})
