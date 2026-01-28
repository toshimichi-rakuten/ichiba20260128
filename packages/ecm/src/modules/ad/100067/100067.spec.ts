import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100067

snapshot({
  name: `Ad ${ad} PC`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'lg',
})
