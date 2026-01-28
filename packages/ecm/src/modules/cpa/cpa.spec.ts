import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'CPA SP horizontal',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-cpa--sp-horizontal`,
  device: 'sp',
})

snapshot({
  name: 'CPA SP slider',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-cpa--slider`,
  device: 'sp',
})

snapshot({
  name: 'CPA MD four',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-cpa--pc-four`,
  device: 'md',
})
