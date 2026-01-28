import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Content card guide SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--guide',
  device: 'sp',
})

snapshot({
  name: 'Content card guide MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--guide',
  device: 'MD',
})
