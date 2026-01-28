import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: '[HTML Data] JSON to HTML',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-jsontohtml--default`,
  device: 'sp',
})

snapshot({
  name: '[JSON Data] JSON to HTML',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-jsontohtml--json`,
  device: 'sp',
})
