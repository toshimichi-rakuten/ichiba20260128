import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Toggle', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtoggle--default&viewMode=story`)

  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  const body = page.locator('body')
  const floating = body.locator('.ecm-floating-toggle')

  await rootScreenshot(floating, testInfo)

  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('#toggle1[aria-hidden="false"]')
  await page.waitForTimeout(300)

  await rootScreenshot(floating, testInfo)
})
