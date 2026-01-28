import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Okurimono SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-okurimono--default',
  device: 'sp',
})

snapshot({
  name: 'Okurimono MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-okurimono--default',
  device: 'md',
})
