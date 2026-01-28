import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Alert SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-alert--default',
  device: 'sp',
})

snapshot({
  name: 'Alert MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-alert--default',
  device: 'md',
})
