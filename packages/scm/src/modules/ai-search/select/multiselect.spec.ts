import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../../e2e/helper'
import { MOCK_SEARCH_DATA_DELAY, MOCK_SUGGEST_DATA_DELAY } from '../mock'

const TOTAL_WAIT_TIME = MOCK_SEARCH_DATA_DELAY + MOCK_SUGGEST_DATA_DELAY

test('AI Search SP Multiselect', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')
  await page.waitForTimeout(500)

  await page.click('.scm-ai-search-select-sm[data-filter-name="categories"]')
  await page.waitForSelector('[id="ai-search-sheet-categories"][aria-hidden="false"]')

  const firstCheckbox = page.locator('#ai-search-sheet-categories input[name="categories-sm"]').first()
  await firstCheckbox.check()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  const secondCheckbox = page.locator('#ai-search-sheet-categories input[name="categories-sm"]').nth(1)
  await secondCheckbox.check()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await firstCheckbox.uncheck()
  await page.waitForTimeout(300)
  await secondCheckbox.uncheck()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.click('.ecm-sheet-content-close')
  await page.waitForTimeout(500)
  await page.waitForSelector('[id="ai-search-sheet-categories"][aria-hidden="true"]', { state: 'attached' })
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Multiselect', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')

  await page.click('.scm-ai-search-select-md[data-filter-name="categories"]')
  await page.waitForSelector('[id="ai-search-dropdown-categories"][style*="block"]')

  const firstCheckbox = page.locator('#ai-search-dropdown-categories input[name="categories-md"]').first()
  await firstCheckbox.check()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  const secondCheckbox = page.locator('#ai-search-dropdown-categories input[name="categories-md"]').nth(1)
  await secondCheckbox.check()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await firstCheckbox.uncheck()
  await page.waitForTimeout(300)
  await secondCheckbox.uncheck()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.click('.scm-ai-search-filter-wrapper')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Multiselect', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-toggle-open')
  await page.click('.scm-ai-search-toggle-open')
  await page.waitForSelector('[id="searchFilterToggle1"][aria-hidden="false"]')

  await page.click('.scm-ai-search-select-md[data-filter-name="categories"]')
  await page.waitForSelector('[id="ai-search-dropdown-categories"][style*="block"]')

  const firstCheckbox = page.locator('#ai-search-dropdown-categories input[name="categories-md"]').first()
  await firstCheckbox.check()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  const secondCheckbox = page.locator('#ai-search-dropdown-categories input[name="categories-md"]').nth(1)
  await secondCheckbox.check()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await firstCheckbox.uncheck()
  await page.waitForTimeout(300)
  await secondCheckbox.uncheck()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.click('.scm-ai-search-filter-wrapper')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})
