import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100008

snapshot({
  name: `Ad ${ad} SP-2Column(PC-3Column) SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC-3Column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} PC-4Column LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})
