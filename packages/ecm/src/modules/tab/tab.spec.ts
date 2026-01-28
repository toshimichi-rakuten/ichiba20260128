import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Tab MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--default`,
  device: 'md',
})

snapshot({
  name: 'Tab SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--default`,
  device: 'sp',
})

snapshot({
  name: 'Tab Card MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--card-image`,
  device: 'md',
})

snapshot({
  name: 'Tab Card SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--card-image`,
  device: 'sp',
})

snapshot({
  name: 'Tab Card Image MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--card-image`,
  device: 'md',
})

snapshot({
  name: 'Tab Card Image SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--card-image`,
  device: 'sp',
})

snapshot({
  name: 'Tab Nested MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--nested`,
  device: 'md',
})

snapshot({
  name: 'Tab Nested SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-tab--nested`,
  device: 'sp',
})
