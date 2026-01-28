import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100167

snapshot({
  name: `Ad ${ad} Solo SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-3Column LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} Sp-2Column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'sp',
})
