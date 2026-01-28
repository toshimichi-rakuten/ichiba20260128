import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Grid SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-grid--default&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Grid PC',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-grid--default&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Grid Sample1 SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-grid--sample-1&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Grid Sample1 PC',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-grid--sample-1&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Grid Sample2 SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-grid--sample-2&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Grid Sample2 PC',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-grid--sample-2&viewMode=story`,
  device: 'lg',
})
