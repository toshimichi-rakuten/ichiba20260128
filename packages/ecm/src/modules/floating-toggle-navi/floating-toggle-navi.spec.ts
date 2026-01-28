import { test, devices } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Floating Toggle Navi Above', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--above&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Right', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--right&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sidebar[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Icon Above', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--icon-above&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Icon Above Menu', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--icon-above-menu&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Icon Right Menu', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingtogglenavi--icon-right-menu`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Icon Right', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--icon-right&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sidebar[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Button Above', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--button-above&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Button Right', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--button-right&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sidebar[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Scroll Above', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--scroll-above&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sheet[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Icon Scroll Above icon', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--scroll-above-icon&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })
  await page.waitForTimeout(3000)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Icon Scroll Right', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-floatingtogglenavi--scroll-right-icon`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sidebar[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})

test('Floating Toggle Navi Scroll Icon Right', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-floatingtogglenavi--scroll-right&viewMode=story`)
  await page.waitForLoadState('networkidle')

  await page.evaluate(() => {
    window.scrollBy(0, 500)
  })

  await page.waitForTimeout(3000)

  const floating = page.locator('.ecm-floating-toggle-navi')
  const toggle = floating.locator('button')

  await toggle.click()

  await page.waitForSelector('.ecm-sidebar[aria-hidden="false"]')
  await page.waitForTimeout(500)

  await rootScreenshot(page, testInfo)
})
