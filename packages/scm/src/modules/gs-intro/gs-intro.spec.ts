import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'GsIntro Default SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--default',
  device: 'sp',
})

snapshot({
  name: 'GsIntro Default MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--default',
  device: 'md',
})

snapshot({
  name: 'GsIntro Gray SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--gray',
  device: 'sp',
})

snapshot({
  name: 'GsIntro Gray MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--gray',
  device: 'md',
})

snapshot({
  name: 'GsIntro Filter SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--filter',
  device: 'sp',
})

snapshot({
  name: 'GsIntro Filter MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--filter',
  device: 'md',
})

snapshot({
  name: 'GsIntro Filter Multi SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--filter-multi',
  device: 'sp',
})

snapshot({
  name: 'GsIntro Filter Multi MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-giftsearchintro--filter-multi',
  device: 'md',
})
