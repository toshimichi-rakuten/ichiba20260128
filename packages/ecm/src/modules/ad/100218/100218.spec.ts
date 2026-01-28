import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100218

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
  name: `Ad ${ad} Pc-2column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-2-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-2column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-2-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Pc-3column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-3column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Pc-3column LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-3-column`,
  device: 'lg',
})

snapshot({
  name: `Ad ${ad} Pc-4column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-4column LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-pc-4-column`,
  device: 'lg',
})
