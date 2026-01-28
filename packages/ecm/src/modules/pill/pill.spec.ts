import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Pill',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-pill--default`,
  device: 'sp',
})
