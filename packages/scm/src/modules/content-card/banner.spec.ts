import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Content card banner SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--banner',
  device: 'sp',
})

snapshot({
  name: 'Content card banner MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--banner',
  device: 'MD',
})
