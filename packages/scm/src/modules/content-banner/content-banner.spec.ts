import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'ContentBanner side SP',
  url: 'http://localhost:8081/iframe.html?id=modules-contentbanner--side&viewMode=story&refId=scm',
  device: 'sp',
})

snapshot({
  name: 'ContentBanner side MD',
  url: 'http://localhost:8081/iframe.html?id=modules-contentbanner--side&viewMode=story&refId=scm',
  device: 'md',
})

snapshot({
  name: 'ContentBanner center SP',
  url: 'http://localhost:8081/iframe.html?id=modules-contentbanner--center&viewMode=story&refId=scm',
  device: 'sp',
})

snapshot({
  name: 'ContentBanner center MD',
  url: 'http://localhost:8081/iframe.html?id=modules-contentbanner--center&viewMode=story&refId=scm',
  device: 'md',
})

snapshot({
  name: 'ContentBanner panel SP',
  url: 'http://localhost:8081/iframe.html?id=modules-contentbanner--panel&viewMode=story&refId=scm',
  device: 'sp',
})

snapshot({
  name: 'ContentBanner panel MD',
  url: 'http://localhost:8081/iframe.html?id=modules-contentbanner--panel&viewMode=story&refId=scm',
  device: 'md',
})

snapshot({
  name: 'ContentBanner panel solid SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentbanner--panel-solid',
  device: 'sp',
})

snapshot({
  name: 'ContentBanner panel solid MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-contentbanner--panel-solid',
  device: 'md',
})
