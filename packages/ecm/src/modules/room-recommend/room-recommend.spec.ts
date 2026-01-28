import { test, devices } from '@playwright/test'
import { ROOT_PATH, snapshot, rootScreenshot } from '../../../../../e2e/helper'

snapshot({
  name: 'RoomRecommend SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-roomrecommend--default&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'RoomRecommend MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-roomrecommend--default&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'RoomRecommend LG',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-roomrecommend--default&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'RoomRecommend XL',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-roomrecommend--default&viewMode=story`,
  device: 'xl',
})

test('RoomRecommend SP [Open]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-roomrecommend--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await rootScreenshot(page, testInfo)
  const button = page.locator('.ecm-icon-info-filled')

  await button.click()

  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})
