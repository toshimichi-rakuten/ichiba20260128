import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'ContentGuide SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentguide--default',
  device: 'sp',
})

snapshot({
  name: 'ContentGuide MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentguide--default',
  device: 'md',
})
