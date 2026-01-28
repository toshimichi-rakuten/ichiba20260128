import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100232

snapshot({
  name: `Ad ${ad}`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})
