import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Modal Static Button SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-modal--static-button')
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  await page.locator('.scm-modal-trigger[aria-controls]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Modal Static Button LG [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['Desktop Chrome'].viewport)

  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-modal--static-button')
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  await page.locator('.scm-modal-trigger[aria-controls]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Modal Floating Button SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-modal--floating-button')
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)

  await page.locator('.scm-modal-trigger[aria-controls]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Modal Floating Button LG [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['Desktop Chrome'].viewport)

  await page.goto('http://localhost:8081/iframe.html?viewMode=story&id=modules-modal--floating-button')
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)

  await page.locator('.scm-modal-trigger[aria-controls]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})
