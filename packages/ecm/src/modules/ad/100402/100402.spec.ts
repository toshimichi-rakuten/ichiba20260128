import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100402

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
  name: `Ad ${ad} Solo PC Horizontal SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-pc-horizontal`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo PC Horizontal MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-pc-horizontal`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo Top SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-top`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo Top MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-top`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Sp-1Column（Pc-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-2-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-2Column（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-2-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Sp-1Column（Pc-List）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-list`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-List（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-list`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP Sp-Scroll（Pc-4Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-scroll-pc-4-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-4Column（Sp-Scroll）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-scroll-pc-4-column`,
  device: 'md',
})
