import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100413

snapshot({
  name: `Ad ${ad} Solo Badge SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-badge`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo Badge MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-badge`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo Text SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-text`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo Text MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-text`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Badge Sp-1Column（Pc-List）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-badge-sp-1-column-pc-list`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Badge Pc-List（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-badge-sp-1-column-pc-list`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Text Sp-1Column（Pc-List）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-text-sp-1-column-pc-list`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Text Pc-List（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-text-sp-1-column-pc-list`,
  device: 'md',
})
