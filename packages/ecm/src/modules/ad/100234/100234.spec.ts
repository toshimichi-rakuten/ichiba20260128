import { test } from '@playwright/test'
import { rootScreenshot, snapshot, ROOT_PATH } from '../../../../../../e2e/helper'

const ad = 100234

snapshot({
  name: `Ad ${ad}`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`,
  device: 'md',
})

snapshot({
  name: `Ad ${ad} Solo`,
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}-solo`,
  device: 'md',
})

test(`Ad ${ad} hover`, async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-ad-${ad}--ad-${ad}`)

  await page.waitForLoadState('networkidle')
  const body = page.locator('body')

  await page.hover('.ecm-slider-container')
  await page.waitForTimeout(300)

  await rootScreenshot(body, testInfo)
})
