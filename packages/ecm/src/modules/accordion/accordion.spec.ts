import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Accordion Default [active section state]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-accordion--default&viewMode=story`)

  await page.waitForLoadState('networkidle')

  const root = page.locator('body')

  await rootScreenshot(root, testInfo)

  const button = await root.locator('[data-accordion-trigger]').first()

  await button.click()

  await page.waitForSelector('.ecm-accordion-panel[aria-hidden="false"]')
  await page.waitForTimeout(300)

  await rootScreenshot(root, testInfo)
})

test('Accordion Multiple [active section state]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-accordion--multiple&viewMode=story`)

  await page.waitForLoadState('networkidle')

  const root = page.locator('body')

  await rootScreenshot(root, testInfo)

  const buttons = await root.locator('[data-accordion-trigger]').all()

  await buttons[0].click()
  await buttons[1].click()

  await page.waitForSelector('.ecm-accordion-panel[aria-hidden="false"]')
  await page.waitForTimeout(300)

  await rootScreenshot(root, testInfo)
})
