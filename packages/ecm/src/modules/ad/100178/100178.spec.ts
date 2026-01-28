import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100178

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
  name: `Ad ${ad} SP-2Column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC-4Column LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'lg',
})
