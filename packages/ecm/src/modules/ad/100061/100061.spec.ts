import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100061

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-2-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-1-column-pc-2-column`,
  device: 'lg',
})
