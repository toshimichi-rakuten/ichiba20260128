import { test } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi Dropdown MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--dropdown`)

  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  await page.hover('[aria-controls="dropdown5"]')

  await page.hover('text=メニュー項目5-4')

  await rootScreenshot(page, testInfo)

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

  await page.hover('[aria-controls="dropdown5"]')

  await page.hover('text=メニュー項目5-4')

  await rootScreenshot(page, testInfo)
})
