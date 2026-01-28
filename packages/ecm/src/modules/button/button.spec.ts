import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Button',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-button--default`,
  device: 'sp',
})

snapshot({
  name: 'Button Left Icon',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-button--left-icon`,
  device: 'sp',
})

snapshot({
  name: 'Button Right Icon',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-button--right-icon`,
  device: 'sp',
})

snapshot({
  name: 'Button Both Icon',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-button--both-icon`,
  device: 'sp',
})
