import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'
import { test, devices } from '@playwright/test'

test('Floating', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floating--hidden&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 700)
  })

  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)

  await page.evaluate(() => {
    window.scrollBy(0, 2000)
  })

  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})

test('Floating CLS', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floating--threshold&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 1000)
  })

  await rootScreenshot(page, testInfo)

  await page.evaluate(() => {
    const windowPadding = 16
    window.scrollBy(0, windowPadding + 5)
  })

  await page.waitForTimeout(300)

  await rootScreenshot(page, testInfo)
})

test('Floating BodyLock', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floating--body-lock&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  // Scroll to bottom of page to show floating
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

  // Wait for animation
  await page.waitForTimeout(1000)

  await rootScreenshot(page, testInfo)

  await page.getByText('Open').click()

  // Wait for animation
  await page.waitForTimeout(1000)

  await rootScreenshot(page, testInfo)
})
