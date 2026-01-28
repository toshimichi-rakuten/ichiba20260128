import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi Static MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--static`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  const first = page.locator('text=5')
  first.click()

  // wait for scrollTo event on click with behavior smooth to end.
  await page.waitForTimeout(1500)

  await rootScreenshot(page, testInfo)
})

test('Floating Navi Static SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--static`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  const first = page.locator('text=5')

  first.click()

  // wait for scrollTo event on click with behavior smooth to end.
  await page.waitForTimeout(1500)

  await rootScreenshot(page, testInfo)
})
