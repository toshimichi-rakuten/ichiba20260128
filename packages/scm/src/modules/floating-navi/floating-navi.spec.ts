import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Floating Navi LG', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['Desktop Chrome'].viewport)

  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingnavi--default`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  await page.hover('[aria-controls="menu1"]')

  await rootScreenshot(page, testInfo)

  await page.hover('.scm-floating-navi-button')

  await rootScreenshot(page, testInfo)
})
