import { test, devices } from '@playwright/test'
import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

test('Floating Top', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-floatingtop--default&viewMode=story`)

  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  const root = page.locator('a')

  await rootScreenshot(root, testInfo)
})
