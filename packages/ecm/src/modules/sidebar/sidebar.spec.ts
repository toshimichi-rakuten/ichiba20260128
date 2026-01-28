import { test, devices } from '@playwright/test'
import { ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'

test('Left Sidebar SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sidebar--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  const component = page.locator('.ecm-sidebar[aria-hidden="false"]')
  await rootScreenshot(component, testInfo)
})

test('Left Sidebar MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sidebar--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  const component = page.locator('.ecm-sidebar[aria-hidden="false"]')
  await rootScreenshot(component, testInfo)
})

test('Right Sidebar SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sidebar--right&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  const component = page.locator('.ecm-sidebar[aria-hidden="false"]')
  await rootScreenshot(component, testInfo)
})

test('Right Sidebar MD [Open]', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-sidebar--right&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.locator('text=Open').click()

  const component = page.locator('.ecm-sidebar[aria-hidden="false"]')
  await rootScreenshot(component, testInfo)
})
