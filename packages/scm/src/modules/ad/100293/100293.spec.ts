import { snapshot } from '../../../../../../e2e/helper'

const ad = 100293

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

snapshot({
  name: `Ad ${ad} solo SP`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--solo&viewMode=story&refId=scm`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} solo MD`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--solo&viewMode=story&refId=scm`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} column SP`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--column&viewMode=story&refId=scm`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} column MD`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--column&viewMode=story&refId=scm`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} color demo SP`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--color-demo&viewMode=story&refId=scm`,
  device: 'sp',
})

snapshot({
  name: `Ad ${ad} color demo MD`,
  url: `http://localhost:8081/iframe.html?id=modules-ad-${ad}--color-demo&viewMode=story&refId=scm`,
  device: 'md',
})
