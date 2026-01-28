import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Bookmark SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-bookmark--default-sp`,
  device: 'sp',
})

snapshot({
  name: 'Bookmark 704',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-bookmark--default-704`,
  device: '704',
})

snapshot({
  name: 'Bookmark LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-bookmark--default`,
  device: 'lg',
})
