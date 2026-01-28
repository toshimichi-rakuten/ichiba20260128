import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100106

snapshot({
  name: `Ad ${ad} SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'sp',
})
