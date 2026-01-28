import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Footer SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-footer--default',
  device: 'sp',
})

snapshot({
  name: 'Footer MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-footer--default',
  device: 'md',
})
