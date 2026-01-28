import { snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100063

snapshot({
  name: `Ad ${ad} Solo MD`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'md',
})
