import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'ScrollToTop',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-scrolltotop--default',
  device: 'sp',
})
