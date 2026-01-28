import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'ResponsiveImage SP',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-responsiveimage--default',
  device: 'sp',
})

snapshot({
  name: 'ResponsiveImage MD',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-responsiveimage--default',
  device: 'md',
})
