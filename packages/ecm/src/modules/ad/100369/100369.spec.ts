import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100369

snapshot({
  name: `Ad ${ad} Solo half MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-half`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo half SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-half`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo discount MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-discount`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo discount SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-discount`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP（Pc-4Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-2Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-2-column`,
  device: 'md',
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
