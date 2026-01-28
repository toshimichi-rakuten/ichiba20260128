import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Accordion SP [active section state]', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)

  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-accordion--default`)

  await page.waitForLoadState('networkidle')

  const root = page.locator('body')

  await rootScreenshot(root, testInfo)

  const button = await root.locator('[data-accordion-trigger]').first()

  await button.click()

  await page.waitForSelector('.ecm-accordion-panel[aria-hidden="false"]')
  await page.waitForTimeout(300)

  await rootScreenshot(root, testInfo)
})

test('Accordion MD [active section state]', async ({ page }, testInfo) => {
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-accordion--default`)

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
