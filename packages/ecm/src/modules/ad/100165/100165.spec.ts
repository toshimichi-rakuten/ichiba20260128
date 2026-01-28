import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100165

// TODO: SOLO Snapshot

snapshot({
  name: `Ad ${ad} SP Horizontal`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-horizontal`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Vertical`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-vertical`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP Vertical 2`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-vertical-2-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD Horizontal`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-horizontal`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} MD Vertical`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-vertical`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} MD Vertical 2`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-vertical-2-column`,
  device: 'md',
})
