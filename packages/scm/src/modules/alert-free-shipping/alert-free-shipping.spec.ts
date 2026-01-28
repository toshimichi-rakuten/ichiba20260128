import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Alert FreeShipping SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-alert-freeshipping--default',
  device: 'sp',
})

snapshot({
  name: 'Alert FreeShipping MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-alert-freeshipping--default',
  device: 'md',
})
