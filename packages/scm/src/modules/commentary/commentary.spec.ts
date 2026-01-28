import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Commentary SP [active section state]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-commentary--default`)
  await page.waitForLoadState('networkidle')
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)

  await root.locator('[aria-controls="scm-view-more-1"]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(root, testInfo)
})

test('Commentary MD [active section state]', async ({ page }, testInfo) => {
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-commentary--default`)
  await page.waitForLoadState('networkidle')
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)

  await root.locator('[aria-controls="scm-view-more-1"]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(root, testInfo)
})

test('Commentary Gray SP [active section state]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-commentary--gray`)
  await page.waitForLoadState('networkidle')
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)

  await root.locator('[aria-controls="scm-view-more-1"]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(root, testInfo)
})

test('Commentary Gray MD [active section state]', async ({ page }, testInfo) => {
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-commentary--gray`)
  await page.waitForLoadState('networkidle')
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)

  await root.locator('[aria-controls="scm-view-more-1"]').click()

  await page.waitForTimeout(500)
  await rootScreenshot(root, testInfo)
})
