import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Banner SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-banner--default',
  device: 'sp',
})

snapshot({
  name: 'Banner MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-banner--default',
  device: 'md',
})

snapshot({
  name: 'Banner column SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-banner--column',
  device: 'sp',
})

snapshot({
  name: 'Banner column MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-banner--column',
  device: 'md',
})
