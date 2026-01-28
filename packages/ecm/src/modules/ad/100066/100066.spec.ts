import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100066

snapshot({
  name: `Ad ${ad} SP Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP List`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-list`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Solo List`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-list`,
  device: 'sp',
})
