import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../../e2e/helper'

test('AI Search SP Error State', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--search-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Error State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--search-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Error State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--search-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search SP No Result State', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--search-no-result&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search MD No Result State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--search-no-result&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search LG No Result State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--search-no-result&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search SP Suggest Loading State', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-loading&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Suggest Loading State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-loading&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Suggest Loading State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-loading&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search SP Suggest Error State', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Suggest Error State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Suggest Error State', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--suggest-error&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})
