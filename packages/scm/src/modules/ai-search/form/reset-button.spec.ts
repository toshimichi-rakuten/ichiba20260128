import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../../e2e/helper'
import { MOCK_SEARCH_DATA_DELAY, MOCK_SUGGEST_DATA_DELAY } from '../mock'

const TOTAL_WAIT_TIME = MOCK_SEARCH_DATA_DELAY + MOCK_SUGGEST_DATA_DELAY

test('AI Search SP Reset Button', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-text-input')
  const textInput = page.locator('.scm-ai-search-text-input')
  await textInput.fill('test input')
  await page.waitForTimeout(300)

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.waitForSelector('[data-scm-search-ai-range-slider-from-slider]')
  const fromSlider = page.locator('[data-scm-search-ai-range-slider-from-slider]')
  const toSlider = page.locator('[data-scm-search-ai-range-slider-to-slider]')
  await fromSlider.fill('4000')
  await toSlider.fill('14000')
  await page.waitForTimeout(500)

  await page.waitForSelector('.scm-ai-search-submit-reset-button')
  await page.click('.scm-ai-search-submit-reset-button')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Reset Button', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-text-input')
  const textInput = page.locator('.scm-ai-search-text-input')
  await textInput.fill('test input')
  await page.waitForTimeout(300)

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.waitForSelector('[data-scm-search-ai-range-slider-from-slider]')
  const fromSlider = page.locator('[data-scm-search-ai-range-slider-from-slider]')
  const toSlider = page.locator('[data-scm-search-ai-range-slider-to-slider]')
  await fromSlider.fill('2000')
  await toSlider.fill('20000')
  await page.waitForTimeout(500)

  await page.waitForSelector('.scm-ai-search-submit-reset-button')
  await page.click('.scm-ai-search-submit-reset-button')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Reset Button', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-text-input')
  const textInput = page.locator('.scm-ai-search-text-input')
  await textInput.fill('test input')
  await page.waitForTimeout(300)

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.waitForSelector('[data-scm-search-ai-range-slider-from-slider]')
  const fromSlider = page.locator('[data-scm-search-ai-range-slider-from-slider]')
  const toSlider = page.locator('[data-scm-search-ai-range-slider-to-slider]')
  await fromSlider.fill('2000')
  await toSlider.fill('20000')
  await page.waitForTimeout(500)

  await page.waitForSelector('.scm-ai-search-submit-reset-button')
  await page.click('.scm-ai-search-submit-reset-button')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})
