import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Content card horizontal SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--horizontal',
  device: 'sp',
})

snapshot({
  name: 'Content card horizontal MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--horizontal',
  device: 'MD',
})
