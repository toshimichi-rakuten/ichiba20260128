import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi Link MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--link`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
})

test('Floating Navi Link SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--link`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
})
