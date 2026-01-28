import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Floating Top', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingtop--default`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  const root = page.locator('.scm-scroll-to-top')

  await rootScreenshot(root, testInfo)
})
