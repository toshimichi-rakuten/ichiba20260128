import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../e2e/helper'

test('Floating Toggle Navi', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingtogglenavi--default`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 800)
  })
  await page.waitForTimeout(5000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('.ecm-floating-toggle-navi-button')
  await page.waitForTimeout(300)

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Bordered', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingtogglenavi--bordered`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 800)
  })
  await page.waitForTimeout(5000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('.ecm-floating-toggle-navi-button')
  await page.waitForTimeout(300)

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Anchor', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingtogglenavi--anchor`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 800)
  })
  await page.waitForTimeout(5000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('.ecm-floating-toggle-navi-button')
  await page.waitForTimeout(300)

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Anchor Bordered', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?viewMode=story&id=modules-floatingtogglenavi--anchor-bordered`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 800)
  })
  await page.waitForTimeout(5000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('.ecm-floating-toggle-navi-button')
  await page.waitForTimeout(300)

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})
