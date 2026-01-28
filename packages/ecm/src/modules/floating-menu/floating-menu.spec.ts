import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Menu', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingmenu--default&viewMode=story`)

  await page.waitForLoadState('networkidle')

  const first = await page.locator('#target1')

  first.scrollIntoViewIfNeeded()

  const floating = await page.locator('text=コンテンツタイトル5')

  await floating.click()

  // wait for scrollTo event on click with behavior smooth to end.
  await page.waitForTimeout(1500)

  await rootScreenshot(page, testInfo)

  const floating12 = await page.locator('text=コンテンツタイトル9')

  await floating12.click()

  // wait for scrollTo event on click with behavior smooth to end.
  await page.waitForTimeout(1500)

  await rootScreenshot(page, testInfo)
})
