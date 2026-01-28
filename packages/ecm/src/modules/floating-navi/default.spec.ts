import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Navi MD', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--default`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const three = page.locator('text=3')
  three.click()
  await page.waitForTimeout(1500)
  await rootScreenshot(page, testInfo)
})

test('Floating Navi SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingnavi--default`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const three = page.locator('text=3')
  three.click()
  await page.waitForTimeout(1500)
  await rootScreenshot(page, testInfo)

  const seven = page.locator('text=7')
  seven.click()
  await page.waitForTimeout(1500)
  await rootScreenshot(page, testInfo)
})
