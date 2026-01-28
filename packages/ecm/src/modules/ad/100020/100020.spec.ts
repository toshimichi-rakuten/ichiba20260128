import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100020

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP（Pc-3Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-3Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} LG Pc-4Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'lg',
})
