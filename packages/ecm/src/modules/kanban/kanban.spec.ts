import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Kanban SP',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-kanban--default',
  device: 'sp',
})

snapshot({
  name: 'Kanban MD',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-kanban--default',
  device: 'md',
})

snapshot({
  name: 'Kanban with text SP',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-kanban--with-text',
  device: 'sp',
})

snapshot({
  name: 'Kanban with text MD',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-kanban--with-text',
  device: 'md',
})

snapshot({
  name: 'Kanban Slider SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-kanban--slider`,
  device: 'sp',
})

snapshot({
  name: 'Kanban Slider MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-kanban--slider`,
  device: 'md',
})

snapshot({
  name: 'Kanban Slider LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-kanban--slider`,
  device: 'lg',
})

snapshot({
  name: 'Kanban Slider XL',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-kanban--slider`,
  device: 'xl',
})
