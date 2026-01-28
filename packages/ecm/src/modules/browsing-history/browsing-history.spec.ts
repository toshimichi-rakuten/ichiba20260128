import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'BrowsingHistory SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-browsinghistory--default-sp`,
  device: 'sp',
})

snapshot({
  name: 'BrowsingHistory 704',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-browsinghistory--default-704`,
  device: '704',
})

snapshot({
  name: 'BrowsingHistory LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-browsinghistory--default`,
  device: 'lg',
})
