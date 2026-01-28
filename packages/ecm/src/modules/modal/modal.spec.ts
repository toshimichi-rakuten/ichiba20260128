import { test, devices } from '@playwright/test'
import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

test('Modal Fade In Short SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--fade-in-short&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})

test('Modal Fade In Short MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--fade-in-short&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})

test('Modal Fade In Long SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--fade-in-long&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('text=Open')

  await button.click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)

  await page.locator('.ecm-modal-scroller').evaluate((e) => (e.scrollTop = 300))

  await rootScreenshot(page, testInfo)
})

test('Modal Fade In Long MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--fade-in-long&viewMode=story`)
  await page.waitForLoadState('networkidle')
  const button = page.locator('text=Open')
  await button.click()

  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)

  await page.locator('.ecm-modal-scroller').evaluate((e) => (e.scrollTop = 300))

  await rootScreenshot(page, testInfo)
})

test('Modal Slide Up Short SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--slide-up-short&viewMode=story`)

  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForTimeout(800)
  await rootScreenshot(page, testInfo)
})

test('Modal Slide Up Short MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--slide-up-short&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForTimeout(800)
  await rootScreenshot(page, testInfo)
})

test('Modal Slide Up Long SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--slide-up-long&viewMode=story`)

  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForTimeout(800)
  await rootScreenshot(page, testInfo)

  await page.locator('.ecm-modal-scroller').evaluate((e) => (e.scrollTop = 300))

  await rootScreenshot(page, testInfo)
})

test('Modal Slide Up Long MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--slide-up-long&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForTimeout(800)
  await rootScreenshot(page, testInfo)

  await page.locator('.ecm-modal-scroller').evaluate((e) => (e.scrollTop = 300))

  await rootScreenshot(page, testInfo)
})

test('Modal Default Open', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-modal--default-open&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(650)
  await rootScreenshot(page, testInfo)
})
