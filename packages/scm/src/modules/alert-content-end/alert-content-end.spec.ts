import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Alert Content End SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-alert-contentend--default',
  device: 'sp',
})

snapshot({
  name: 'Alert Content End MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-alert-contentend--default',
  device: 'md',
})
