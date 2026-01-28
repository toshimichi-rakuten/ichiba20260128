import { snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Kanban SP',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-kanban--default',
  device: 'sp',
})

snapshot({
  name: 'Kanban MD',
  url: 'http://localhost:8081/iframe.html?viewMode=story&id=modules-kanban--default',
  device: 'md',
})
