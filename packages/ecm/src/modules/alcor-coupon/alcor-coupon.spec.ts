import { test } from '@playwright/test'
import { snapshot, rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Solo Coupon SP',
  url: `${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--solo-coupon&viewMode=story`,
  device: 'sp',
})
snapshot({
  name: 'Solo Coupon PC',
  url: `${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--solo-coupon&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Solo Item SP',
  url: `${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--solo-item&viewMode=story`,
  device: 'sp',
})
snapshot({
  name: 'Solo Item PC',
  url: `${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--solo-item&viewMode=story`,
  device: 'lg',
})

test('Coupon Column SP', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--coupon-column&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
})
test('Coupon Column PC', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--coupon-column&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
})

test('Coupon With Item SP', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--coupon-with-item&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
})
test('Coupon With Item PC', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--coupon-with-item&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
})

test('Coupon With Item With View More SP', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--coupon-with-item-view-more&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('.ecm-view-more-button').first().click()
  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})
test('Coupon With Item With View More PC', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--coupon-with-item-view-more&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('.ecm-view-more-button').first().click()
  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})

test('Item SP', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--item-only&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
})
test('Item PC', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--item-only&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
})

test('Item With View More SP', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--item-only-view-more&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('.ecm-view-more-button').first().click()
  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})
test('Item With View More PC', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 1080 })
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-alcorcoupon--item-only-view-more&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await rootScreenshot(page, testInfo)
  await page.locator('.ecm-view-more-button').first().click()
  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})
