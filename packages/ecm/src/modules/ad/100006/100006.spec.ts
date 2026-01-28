import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100006

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Sp-1Column（Pc-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-2-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Sp-2Column（Pc-3Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Pc-2Column（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-2-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} MD Pc-3Column（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-3-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} LG Pc-4Column（Sp-1Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-4-column`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} MD Pc-2Column（Sp-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-2-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} MD Pc-3Column（Sp-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-3-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} LG Pc-4Column（Sp-2Column）`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-4-column`,
  device: 'lg',
})
