import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100210

snapshot({
  name: `Ad ${ad} Solo MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-2Column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-2-column-html`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Pc-2Column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-2-column-html`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-3Column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-3-column-html`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Pc-3Column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-3-column-html`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} Pc-4Column MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-4-column-html`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Pc-4Column SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-sp-2-column-pc-4-column-html`,
  device: 'sp',
})
