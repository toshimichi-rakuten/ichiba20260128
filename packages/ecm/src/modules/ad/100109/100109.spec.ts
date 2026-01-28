import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100109
snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} PC-4column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC-4column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} PC-5column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-5-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC-5column LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-5-column`,
  device: 'lg',
})
