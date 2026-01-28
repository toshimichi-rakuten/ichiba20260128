import { test, devices } from '@playwright/test'
import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

test('BodyLock Padding BorderBox', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-bodylock--padding-border-box-html&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('text=Open').click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})

test('BodyLock Padding ContentBox', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-bodylock--padding-content-box-html&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('text=Open').click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})

test('BodyLock No Padding AnyBox', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-bodylock--no-padding-html&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('text=Open').click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})
