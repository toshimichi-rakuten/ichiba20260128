import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Container SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-container--default-demo`,
  device: 'sp',
})

snapshot({
  name: 'Container LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-container--default-demo`,
  device: 'lg',
})

snapshot({
  name: 'Container Left Sidebar LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-container--left-sidebar-demo`,
  device: 'lg',
})
