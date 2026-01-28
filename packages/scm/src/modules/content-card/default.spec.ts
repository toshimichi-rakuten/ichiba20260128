import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Content card SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--default',
  device: 'sp',
})

snapshot({
  name: 'Content card MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--default',
  device: 'md',
})
