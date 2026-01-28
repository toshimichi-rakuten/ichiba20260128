import { test, devices } from '@playwright/test'
import { ROOT_PATH, snapshot, rootScreenshot } from '../../../../../e2e/helper'

test('Alcor v2 Hover', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('div.ecm-search-alcor-v2-horizontal:nth-child(1)').first()
  await rootScreenshot(root, testInfo)

  const img = page
    .locator('div.ecm-search-alcor-v2-horizontal:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)')
    .first()
  await img.hover()
  await page.waitForTimeout(500)

  await rootScreenshot(root, testInfo)
})

test('Alcor v2 List SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-v2-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor v2 Ellipse SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-ellipse`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-v2-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor v2 Default Text SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-default-with-text`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-v2-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor v2 List Text SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list-with-text`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-v2-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor v2 List Top Title SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list-top-title-with-text`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-v2-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

snapshot({
  name: 'Alcor v2 List PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list`,
  device: 'lg',
})

snapshot({
  name: 'Alcor v2 Ellipse PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-ellipse`,
  device: 'lg',
})

snapshot({
  name: 'Alcor v2 Default Text PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-default-with-text`,
  device: 'lg',
})

snapshot({
  name: 'Alcor v2 List Text PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list-with-text`,
  device: 'lg',
})

snapshot({
  name: 'Alcor v2 List Top Title PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch-v2--solo-list-top-title-with-text`,
  device: 'lg',
})
