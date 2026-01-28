import { test, devices } from '@playwright/test'
import { ROOT_PATH, snapshot, rootScreenshot } from '../../../../../e2e/helper'

snapshot({
  name: 'SmartCoupon slider SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-smartcoupon--slider`,
  device: 'sp',
})

snapshot({
  name: 'SmartCoupon slider MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-smartcoupon--slider-704`,
  device: 'md',
})

snapshot({
  name: 'SmartCoupon slider LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-smartcoupon--slider`,
  device: 'lg',
})

snapshot({
  name: 'SmartCoupon grid SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-smartcoupon--grid`,
  device: 'sp',
})

snapshot({
  name: 'SmartCoupon grid MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-smartcoupon--grid`,
  device: 'md',
})

test('SmartCoupon Slider SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-smartcoupon--slider&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('.ecm-smart-coupon-popup')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Modal Fade In Short Slider MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-smartcoupon--slider-704&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('.ecm-smart-coupon-popup')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Modal Fade In Short Slider LG [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-smartcoupon--slider&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('.ecm-smart-coupon-popup')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('SmartCoupon Grid SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-smartcoupon--grid&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('.ecm-smart-coupon-popup')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Modal Fade In Short Grid MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-smartcoupon--grid&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('.ecm-smart-coupon-popup')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})
