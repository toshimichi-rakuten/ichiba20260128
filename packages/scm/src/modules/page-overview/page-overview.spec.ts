import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'PageOverview SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-pageoverview--default',
  device: 'sp',
})

snapshot({
  name: 'PageOverview MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-pageoverview--default',
  device: 'md',
})
