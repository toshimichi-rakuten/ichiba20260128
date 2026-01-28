import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'DU Ranking SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-du-ranking--default-sp`,
  device: 'sp',
})

snapshot({
  name: 'DU Ranking SP Tab',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-du-ranking--default-sp-with-tab`,
  device: 'sp',
})

snapshot({
  name: 'DU Ranking PC 704',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-du-ranking--default-704`,
  device: '704',
})

snapshot({
  name: 'DU Ranking PC Tab 704',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-du-ranking--default-with-tab-704`,
  device: '704',
})

snapshot({
  name: 'DU Ranking PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-du-ranking--default`,
  device: 'lg',
})

snapshot({
  name: 'DU Ranking PC Tab',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-du-ranking--default-with-tab`,
  device: 'lg',
})
