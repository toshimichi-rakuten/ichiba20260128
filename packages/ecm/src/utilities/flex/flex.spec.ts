import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Flex Row',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-flex--row&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Flex Column',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-flex--col&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Flex Wrap',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-flex--wrap&viewMode=story`,
  device: 'sp',
})
