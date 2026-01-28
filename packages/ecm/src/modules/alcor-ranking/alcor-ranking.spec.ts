import { test, devices } from '@playwright/test'
import { ROOT_PATH, snapshot, rootScreenshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Alcor Ranking Solo',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--solo`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking SP Column PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Column PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Column PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Column PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Column PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Column PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Column PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Column PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-price-name-review-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP HorizontalColumn PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC HorizontalColumn PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP HorizontalColumn PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC HorizontalColumn PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP HorizontalColumn PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC HorizontalColumn PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP HorizontalColumn PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC HorizontalColumn PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-price-name-review-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Slider PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Slider PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Slider PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Slider PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Slider PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Slider PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP Slider PriceNameViewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC Slider PriceNameViewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--slider-price-name-review-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP ScrollerColumn PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC ScrollerColumn PriceShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP ScrollerColumn PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC ScrollerColumn PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP ScrollerColumn PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC ScrollerColumn PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ranking SP ScrollerColumn PriceNameViewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Ranking PC ScrollerColumn PriceNameViewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-scroller-pc-column-price-name-review-shop`,
  device: 'lg',
})

test('Alcor Ranking SP Column ViewMore PriceShop', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-shop`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC Column ViewMore PriceShop', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-shop`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP Column ViewMore PriceName', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-name`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC Column ViewMore PriceName', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-name`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP Column ViewMore PriceNameShop', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-name-shop`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC Column ViewMore PriceNameShop', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-name-shop`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP Column ViewMore PriceNameShopReview', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-name-review-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC Column ViewMore PriceNameShopReview', async ({ page }, testInfo) => {
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--column-view-more-price-name-review-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP HorizontalColumn ViewMore PriceShop', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC HorizontalColumn ViewMore PriceShop', async ({ page }, testInfo) => {
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP HorizontalColumn ViewMore PriceName', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-name`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC HorizontalColumn ViewMore PriceName', async ({ page }, testInfo) => {
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-name`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP HorizontalColumn ViewMore PriceNameShop', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-name-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC HorizontalColumn ViewMore PriceNameShop', async ({ page }, testInfo) => {
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-name-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking SP HorizontalColumn ViewMore PriceNameReviewShop', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-name-review-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ranking PC HorizontalColumn ViewMore PriceNameReviewShop', async ({ page }, testInfo) => {
  await page.goto(
    `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorranking--sp-horizontal-pc-column-view-more-price-name-review-shop`
  )
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-view-more-button')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})
