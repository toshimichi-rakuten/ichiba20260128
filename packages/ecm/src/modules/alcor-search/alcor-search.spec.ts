import { test, devices } from '@playwright/test'
import { ROOT_PATH, snapshot, rootScreenshot } from '../../../../../e2e/helper'

test('Alcor Hover', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list`)
  await page.waitForLoadState('networkidle')

  const root = page.locator('div.ecm-search-alcor-horizontal:nth-child(1)').first()
  await rootScreenshot(root, testInfo)

  const img = page
    .locator('div.ecm-search-alcor-horizontal:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)')
    .first()
  await img.hover()
  await page.waitForTimeout(500)

  await rootScreenshot(root, testInfo)
})

test('Alcor List SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Ellipse SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-ellipse`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor Default Text SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-default-with-text`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor List Text SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list-with-text`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

test('Alcor List Top Title SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list-top-title-with-text`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  await page.locator('[data-ecm-search-alcor-popup-trigger]').first().click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

snapshot({
  name: 'Alcor List PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Ellipse PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-ellipse`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Default Text PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-default-with-text`,
  device: 'lg',
})

snapshot({
  name: 'Alcor List Text PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list-with-text`,
  device: 'lg',
})

snapshot({
  name: 'Alcor List Top Title PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcorsearch--solo-list-top-title-with-text`,
  device: 'lg',
})
