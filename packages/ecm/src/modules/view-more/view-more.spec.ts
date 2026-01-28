import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Viewmore SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--default&viewMode=story`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const openButton = page.locator('[data-control-type="open"]')
  await openButton.click()

  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})

test('Viewmore Close SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--close&viewMode=story`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const openButton = page.locator('[data-control-type="open"]')
  await openButton.click()

  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)

  const closeButton = page.locator('[data-control-type="close"]')
  await closeButton.click()

  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})

test('Viewmore Close SmoothScroll SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--close-smooth&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)

  const openButton = page.locator('[data-control-type="open"]')
  await openButton.click()

  await page.waitForTimeout(300)
  await page.evaluate(() => {
    window.scrollBy(0, 100)
  })

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo)

  const closeButton = page.locator('[data-control-type="close"]')
  await closeButton.click()

  await page.waitForTimeout(3000)
  await rootScreenshot(page, testInfo)
})

test('Viewmore session SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--session&viewMode=story`)

  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  const openButton = page.locator('[data-control-type="open"]')
  await openButton.click()

  await page.reload()
  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})

test('Viewmore Responsive', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--responsive&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  await page.setViewportSize({
    width: 768,
    height: 1024,
  })
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--responsive&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  await page.setViewportSize({
    width: 1024,
    height: 1024,
  })
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--responsive&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
})


test('Viewmore Open If No Hidden', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--open-if-no-hidden`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  await page.setViewportSize({
    width: 768,
    height: 1024,
  })
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--open-if-no-hidden`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)

  await page.setViewportSize({
    width: 1024,
    height: 1024,
  })
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-viewmore--open-if-no-hidden`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
})
