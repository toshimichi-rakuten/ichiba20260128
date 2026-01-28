import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../../e2e/helper'

test('AI Search SP Suggestion Error', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await page.waitForSelector('.scm-ai-search-text-input-suggestion')
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Suggestion Error', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await page.waitForSelector('.scm-ai-search-text-input-suggestion')
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Suggestion Error', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await page.waitForSelector('.scm-ai-search-text-input-suggestion')
  await rootScreenshot(root, testInfo)
})
