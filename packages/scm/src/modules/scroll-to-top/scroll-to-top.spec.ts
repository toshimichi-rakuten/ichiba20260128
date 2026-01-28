import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'ScrollToTop SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-scrolltotop--default',
  device: 'sp',
})

snapshot({
  name: 'ScrollToTop MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-scrolltotop--default',
  device: 'md',
})
