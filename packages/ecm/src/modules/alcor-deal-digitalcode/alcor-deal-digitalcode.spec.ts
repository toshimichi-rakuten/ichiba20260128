import { snapshot } from '../../../../../e2e/helper'

const ROOT_PATH = process.env.CI ? process.env.STORYBOOK_URL_ALCOR : 'http://localhost:8080'

snapshot({
  name: 'Alcor Deal Digitalcode Solo',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordealdigitalcode--solo&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Deal Digitalcode SP2column',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordealdigitalcode--sp-2-pc-4&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Deal Digitalcode PC4column',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordealdigitalcode--sp-2-pc-4&viewMode=story`,
  device: 'lg',
})
