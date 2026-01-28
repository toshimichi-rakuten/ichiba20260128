import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100071

snapshot({
  name: `Ad ${ad} SP Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-column`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} SP List`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-list`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC List`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-list`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} SP Solo Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC Solo Column`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-column`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} SP Solo List`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-list`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} PC Solo List`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo-list`,
  device: 'lg',
})
