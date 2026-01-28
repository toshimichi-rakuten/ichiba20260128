import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'BuyAgain SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-buyagain--default-sp`,
  device: 'sp',
})

snapshot({
  name: 'BuyAgain 704',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-buyagain--default-704`,
  device: '704',
})

snapshot({
  name: 'BuyAgain LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-buyagain--default`,
  device: 'lg',
})
