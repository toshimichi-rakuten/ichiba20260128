import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

const ad = 'generic-banner'

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'md',
})
