import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Keyword SP',
  url: 'http://localhost:8081/iframe.html?id=modules-keyword--default&viewMode=story&refId=scm',
  device: 'sp',
})

snapshot({
  name: 'Keyword MD',
  url: 'http://localhost:8081/iframe.html?id=modules-keyword--default&viewMode=story&refId=scm',
  device: 'md',
})

snapshot({
  name: 'Keyword Reference',
  url: 'http://localhost:8081/iframe.html?id=modules-keyword--reference&viewMode=story&refId=scm',
  device: 'md',
})
