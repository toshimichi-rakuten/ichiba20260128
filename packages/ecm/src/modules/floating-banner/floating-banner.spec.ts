import { test, devices } from '@playwright/test'
import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

// iPhoneのビューポートサイズを設定
const iPhoneViewport = devices['iPhone 6'].viewport

test('Floating Banner', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingbanner--default&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo)
})

test('Floating Banner White', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingbanner--white&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo)
})

test('Floating Banner Grid', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingbanner--grid&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo)
})

// SP用のテストケース
test('Floating Banner SP', async ({ page }, testInfo) => {
  await page.setViewportSize(iPhoneViewport) // iPhoneのビューポートを設定
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingbanner--default&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo) // SP用のスクリーンショット
})

test('Floating Banner White SP', async ({ page }, testInfo) => {
  await page.setViewportSize(iPhoneViewport) // iPhoneのビューポートを設定
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingbanner--white&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo) // SP用のスクリーンショット
})

test('Floating Banner Grid SP', async ({ page }, testInfo) => {
  await page.setViewportSize(iPhoneViewport) // iPhoneのビューポートを設定
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingbanner--grid&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo) // SP用のスクリーンショット
})
