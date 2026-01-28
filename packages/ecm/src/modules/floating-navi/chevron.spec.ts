import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi Chevron MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--chevron`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  const first = page.locator('text=3')
  first.click()

  // wait for scrollTo event on click with behavior smooth to end.
  await page.waitForTimeout(1500)

  await rootScreenshot(page, testInfo)
})

test('Floating Navi Chevron SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--chevron`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  const first = page.locator('text=3')

  first.click()

  // wait for scrollTo event on click with behavior smooth to end.
  await page.waitForTimeout(1500)

  await rootScreenshot(page, testInfo)
})
