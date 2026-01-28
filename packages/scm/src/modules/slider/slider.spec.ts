import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Slider SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-slider--default',
  device: 'sp',
})

snapshot({
  name: 'Slider MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-slider--default',
  device: 'md',
})

snapshot({
  name: 'Slider Rounded SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-slider--rounded',
  device: 'sp',
})

snapshot({
  name: 'Slider Rounded MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-slider--rounded',
  device: 'md',
})

snapshot({
  name: 'Slider Pagination SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-slider--pagination',
  device: 'sp',
})

snapshot({
  name: 'Slider Pagination MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-slider--pagination',
  device: 'md',
})
