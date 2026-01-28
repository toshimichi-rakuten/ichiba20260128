import { snapshot } from '../../../../../../e2e/helper'

const ad = 100441

snapshot({
  name: `Ad ${ad} Solo SP`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--solo&viewMode=story&refId=scm`,
  device: 'sp',
})
snapshot({
  name: `Ad ${ad} Solo MD`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--solo&viewMode=story&refId=scm`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} SP`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--default&viewMode=story&refId=scm`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} MD`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--default&viewMode=story&refId=scm`,
  device: 'md',
})
