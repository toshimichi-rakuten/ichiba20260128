import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Headline SP',
  url: 'http://localhost:8081/iframe.html?id=modules-headline--headline&viewMode=story&refId=scm&args=',
  device: 'sp',
})

snapshot({
  name: 'Headline MD',
  url: 'http://localhost:8081/iframe.html?id=modules-headline--headline&viewMode=story&refId=scm&args=',
  device: 'md',
})

snapshot({
  name: 'Sub Headline SP',
  url: 'http://localhost:8081/iframe.html?id=modules-headline--sub-headline&viewMode=story&refId=scm&args=',
  device: 'sp',
})

snapshot({
  name: 'Sub Headline MD',
  url: 'http://localhost:8081/iframe.html?id=modules-headline--sub-headline&viewMode=story&refId=scm&args=',
  device: 'md',
})

snapshot({
  name: 'Headline Description SP',
  url: 'http://localhost:8081/iframe.html?id=modules-headline--description&viewMode=story&refId=scm',
  device: 'sp',
})

snapshot({
  name: 'Headline Description MD',
  url: 'http://localhost:8081/iframe.html?id=modules-headline--description&viewMode=story&refId=scm&args=',
  device: 'md',
})
