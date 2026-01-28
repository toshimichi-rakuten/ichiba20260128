import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi Hidden MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--hidden`)

  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 5000)
  })

  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})

test('Floating Navi Hidden SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--hidden`)

  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 5000)
  })

  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})
