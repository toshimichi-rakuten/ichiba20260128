import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Card SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-card--default-demo`,
  device: 'sp',
})

snapshot({
  name: 'Card PC(LG)',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-card--default-demo`,
  device: 'lg',
})
