import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Search MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--default',
  device: 'md',
})

snapshot({
  name: 'Search SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--default',
  device: 'sp',
})

snapshot({
  name: 'Search Selection MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--selection',
  device: 'md',
})

snapshot({
  name: 'Search Selection SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--selection',
  device: 'sp',
})

snapshot({
  name: 'Search Selection Keyword MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--selection-keyword',
  device: 'md',
})

snapshot({
  name: 'Search Selection Keyword SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--selection-keyword',
  device: 'sp',
})

snapshot({
  name: 'Search Selection Keyword List MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--selection-keyword-list',
  device: 'md',
})

snapshot({
  name: 'Search Selection Keyword List SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-search--selection-keyword-list',
  device: 'sp',
})
