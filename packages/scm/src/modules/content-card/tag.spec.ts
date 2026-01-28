import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Content card Tag SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--tag',
  device: 'sp',
})

snapshot({
  name: 'Content card Tag MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentcard--tag',
  device: 'MD',
})
