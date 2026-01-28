import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Badge Filled',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-badge--filled&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Badge Outlined',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-badge--outlined&viewMode=story`,
  device: 'sp',
})
