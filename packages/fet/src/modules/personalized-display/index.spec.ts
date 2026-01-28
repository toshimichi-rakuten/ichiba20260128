import { test } from '@playwright/test'
import { FET_ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

test('Personalized Display [Red]', async ({ page }, testInfo) => {
  await page.goto(`${FET_ROOT_PATH}/iframe.html?args=&id=plugins-personalizeddisplay--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Red').click()
  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})

test('Personalized Display [Blue]', async ({ page }, testInfo) => {
  await page.goto(`${FET_ROOT_PATH}/iframe.html?args=&id=plugins-personalizeddisplay--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Blue').click()
  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})

test('Personalized Display [Green]', async ({ page }, testInfo) => {
  await page.goto(`${FET_ROOT_PATH}/iframe.html?args=&id=plugins-personalizeddisplay--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Green').click()
  await page.waitForTimeout(300)
  await rootScreenshot(page, testInfo)
})
