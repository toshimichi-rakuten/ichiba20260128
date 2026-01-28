import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'
import { test } from '@playwright/test'

test('Smooth Scroll Offset', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1366, height: 768 })

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-smoothscroll--offset&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => window.scrollBy(0, 3000))
  await page.locator('a').locator('nth=5').click()

  await page.waitForTimeout(1000)

  await rootScreenshot(page, testInfo)
})
