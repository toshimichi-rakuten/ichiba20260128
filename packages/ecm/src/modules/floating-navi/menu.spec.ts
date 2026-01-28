import { test } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi Menu MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--menu`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  await page.hover('[aria-controls="menu5"]')

  await rootScreenshot(page, testInfo)

  const section = await page.locator('#section4')

  await section.scrollIntoViewIfNeeded()

  await page.hover('[aria-controls="menu5"]')

  await rootScreenshot(page, testInfo)
})
