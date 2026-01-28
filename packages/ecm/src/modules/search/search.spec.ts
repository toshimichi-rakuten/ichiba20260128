import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Search SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--default&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Search MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--default&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'Search Selection MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--selection&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'Search Selection SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--selection&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Search Selection Keyword MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--selection-keyword&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'Search Selection Keyword SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--selection-keyword&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Search Selection Keyword List MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--selection-keyword-list&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'Search Selection Keyword List SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-search--selection-keyword-list&viewMode=story`,
  device: 'sp',
})
