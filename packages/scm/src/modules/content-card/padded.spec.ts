import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Content card padded SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--padded',
  device: 'sp',
})

snapshot({
  name: 'Content card padded MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--padded',
  device: 'MD',
})
