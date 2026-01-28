import { test, devices } from '@playwright/test'
import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

test('Above Sheet SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sheet--above&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Above Sheet MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sheet--above&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Below Sheet SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sheet--below&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Below Sheet MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sheet--below&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Full Screen Sheet SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sheet--full-screen&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})

test('Full Screen Sheet MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sheet--full-screen&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  const sheet = page.locator('.ecm-sheet')
  await rootScreenshot(sheet, testInfo)
})
