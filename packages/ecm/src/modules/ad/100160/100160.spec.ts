import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100160

snapshot({
  name: `Ad ${ad} Solo SP`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'sp',
})
