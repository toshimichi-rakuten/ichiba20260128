import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100163

snapshot({
  name: `Ad ${ad} Solo SP Vertical`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-vertical`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo SP Horizontal`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-horizontal`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Vertical`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-vertical-grid`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Horizontal`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-horizontal-grid`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC Vertical`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-vertical-grid`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} PC Horizontal`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-horizontal-grid`,
  device: 'md',
})
