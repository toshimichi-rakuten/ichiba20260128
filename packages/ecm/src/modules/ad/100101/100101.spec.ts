import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100101

snapshot({
  name: `Ad ${ad} LG`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'lg',
})
