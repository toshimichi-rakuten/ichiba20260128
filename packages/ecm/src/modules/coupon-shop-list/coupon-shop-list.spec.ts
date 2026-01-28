import { test, devices } from '@playwright/test'
import { rootScreenshot, snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Coupon Shop List Grid MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--default-grid`,
  device: 'md',
})

snapshot({
  name: 'Coupon Shop List Tab Grid MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--tab-grid`,
  device: 'md',
})

snapshot({
  name: 'Coupon Shop List Genre Grid MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--genre-grid`,
  device: 'md',
})

snapshot({
  name: 'Coupon Shop List Tab Genre Grid MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--tab-genre-grid`,
  device: 'md',
})

test('Coupon Shop List Link SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--default-link`)
  await page.waitForLoadState('networkidle')
  await page.locator('.ecm-link[aria-controls]').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Coupon Shop List Tab Link SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--tab-link`)
  await page.waitForLoadState('networkidle')
  await page.locator('.ecm-link[aria-controls]').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Coupon Shop List Genre Accordion SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--genre-accordion`)
  await page.waitForLoadState('networkidle')
  await page.locator('.ecm-link[aria-controls]').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)

  const buttons = await page.locator('[data-accordion-trigger]').all()

  await buttons[0].click()
  await buttons[1].click()

  await page.waitForSelector('.ecm-accordion-panel[aria-hidden="false"]')
  await page.waitForTimeout(300)
  await rootScreenshot(sheet, testInfo)
})

test('Coupon Shop List Tab Genre Accordion SP', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-couponshoplist--tab-genre-accordion`)
  await page.waitForLoadState('networkidle')
  await page.locator('.ecm-link[aria-controls]').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)

  const buttons = await page.locator('[data-accordion-trigger]').all()

  await buttons[0].click()
  await buttons[1].click()

  await page.waitForSelector('.ecm-accordion-panel[aria-hidden="false"]')
  await page.waitForTimeout(300)
  await rootScreenshot(sheet, testInfo)
})
