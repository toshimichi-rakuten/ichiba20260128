import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../../e2e/helper'
import { MOCK_SEARCH_DATA_DELAY, MOCK_SUGGEST_DATA_DELAY } from '../mock'

const TOTAL_WAIT_TIME = MOCK_SEARCH_DATA_DELAY + MOCK_SUGGEST_DATA_DELAY

test('AI Search SP Select', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.click('.scm-ai-search-select-sm[data-filter-name="relationship"]')
  await page.waitForSelector('[id="ai-search-sheet-relationship"][aria-hidden="false"]')

  const option = page.locator('#ai-search-sheet-relationship .scm-ai-search-select-option').first()
  await option.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await option.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.click('#ai-search-sheet-relationship .ecm-sheet-close')
  await page.waitForSelector('[id="ai-search-sheet-relationship"][aria-hidden="true"]', { state: 'attached' })
  await page.waitForTimeout(500)
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Select', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.click('.scm-ai-search-select-md[data-filter-name="relationship"]')
  await page.waitForSelector('[id="ai-search-dropdown-relationship"][style*="block"]')

  const option = page.locator('#ai-search-dropdown-relationship .scm-ai-search-select-option').first()
  await option.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await option.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.click('body')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Select', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.click('.scm-ai-search-select-md[data-filter-name="relationship"]')
  await page.waitForSelector('[id="ai-search-dropdown-relationship"][style*="block"]')

  const option = page.locator('#ai-search-dropdown-relationship .scm-ai-search-select-option').first()
  await option.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await option.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.click('body')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})
