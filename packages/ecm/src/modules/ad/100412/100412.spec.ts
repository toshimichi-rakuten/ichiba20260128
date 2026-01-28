import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100412

snapshot({
  name: `Ad ${ad} Solo SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo Sp Horizontal`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-sp-horizontal`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Sp-2Column（Pc-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-2-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Md Pc-2Column（Sp-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-2-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Sp-List（Pc-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-list-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Md Pc-2Column（Sp-List）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-list-pc-3-column`,
  device: 'md',
})
