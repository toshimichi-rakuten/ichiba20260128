import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'SubpageHeader SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-subpageheader--default',
  device: 'sp',
})
