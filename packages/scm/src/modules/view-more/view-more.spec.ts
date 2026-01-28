import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Viewmore SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-viewmore--default')

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const openButton = page.locator('[data-control-type="open"]')
  await openButton.click()

  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})

test('Viewmore MD', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })

  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-viewmore--default')

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const openButton = page.locator('[data-control-type="open"]')
  await openButton.click()

  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})
