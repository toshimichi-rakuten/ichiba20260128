import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Breadcrumb SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-breadcrumb--default`,
  device: 'sp',
})

snapshot({
  name: 'Breadcrumb MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-breadcrumb--default`,
  device: 'md',
})
