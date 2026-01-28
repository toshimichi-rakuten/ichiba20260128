import { test } from '@playwright/test'
import { rootScreenshot } from '../../../e2e/helper'

const RAKUTEN_SANS_ROOT_PATH = process.env.CI ? process.env.STORYBOOK_URL : 'http://localhost:8083'

test('Rakuten Condensed', async ({ page }, testInfo) => {
  await page.goto(`${RAKUTEN_SANS_ROOT_PATH}/iframe.html?id=fonts-rakutensans--rakuten-condensed&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('Rakuten Rounded', async ({ page }, testInfo) => {
  await page.goto(`${RAKUTEN_SANS_ROOT_PATH}/iframe.html?id=fonts-rakutensans--rakuten-rounded&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('Rakuten Serif', async ({ page }, testInfo) => {
  await page.goto(`${RAKUTEN_SANS_ROOT_PATH}/iframe.html?id=fonts-rakutensans--rakuten-serif&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('Rakuten Serif Italic', async ({ page }, testInfo) => {
  await page.goto(`${RAKUTEN_SANS_ROOT_PATH}/iframe.html?id=fonts-rakutensans--rakuten-serif-italic&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('Rakuten Sans JP2', async ({ page }, testInfo) => {
  await page.goto(`${RAKUTEN_SANS_ROOT_PATH}/iframe.html?id=fonts-rakutensans--rakuten-sans-jp-2&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})

test('Rakuten Sans JP2TN', async ({ page }, testInfo) => {
  await page.goto(`${RAKUTEN_SANS_ROOT_PATH}/iframe.html?id=fonts-rakutensans--rakuten-sans-jp-2-tn&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  const root = page.locator('body')
  await rootScreenshot(root, testInfo)
})
