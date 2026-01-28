import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100017

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo Sp-Horizontal(Pc-column) SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-sp-horizontal`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo Sp-Horizontal(Pc-column) MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-sp-horizontal`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Sp-Column（Pc-3Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-column-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Sp-List（Pc-3Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-list-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-3Column（Sp-Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-column-pc-3-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} LG Pc-4Column（Sp-List）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-list-pc-4-column`,
  device: 'lg',
})
