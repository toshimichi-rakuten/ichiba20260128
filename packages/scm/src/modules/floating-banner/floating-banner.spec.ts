import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Floating Banner Single', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['Desktop Chrome'].viewport)

  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingbanner--single')
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})

test('Floating Banner Multiple', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['Desktop Chrome'].viewport)

  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingbanner--multiple')
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})
