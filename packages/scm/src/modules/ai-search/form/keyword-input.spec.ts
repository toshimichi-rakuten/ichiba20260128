import { test, devices } from '@playwright/test'
import { rootScreenshot } from '../../../../../../e2e/helper'
import { MOCK_SEARCH_DATA_DELAY, MOCK_SUGGEST_DATA_DELAY } from '../mock'

const TOTAL_WAIT_TIME = MOCK_SEARCH_DATA_DELAY + MOCK_SUGGEST_DATA_DELAY

test('AI Search SP Keyword Input', async ({ page }, testInfo) => {
  await page.setViewportSize(devices['iPhone 6'].viewport)
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-text-input')
  const textInput = page.locator('.scm-ai-search-text-input')
  await textInput.fill('banana')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.waitForSelector('.scm-ai-search-text-input-suggestion')
  const firstSuggestion = page.locator('.scm-ai-search-text-input-suggestion').first()
  await firstSuggestion.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await textInput.fill('apple')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  const secondSuggestion = page.locator('.scm-ai-search-text-input-suggestion').nth(1)
  await secondSuggestion.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search MD Keyword Input', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-text-input')
  const textInput = page.locator('.scm-ai-search-text-input')
  await textInput.fill('banana')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.waitForSelector('.scm-ai-search-text-input-suggestion')
  const firstSuggestion = page.locator('.scm-ai-search-text-input-suggestion').first()
  await firstSuggestion.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await textInput.fill('apple')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  const secondSuggestion = page.locator('.scm-ai-search-text-input-suggestion').nth(1)
  await secondSuggestion.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})

test('AI Search LG Keyword Input', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`http://localhost:8081/iframe.html?id=modules-aisearch--default&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(TOTAL_WAIT_TIME)

  const root = page.locator('body')

  await page.waitForSelector('.scm-ai-search-text-input')
  const textInput = page.locator('.scm-ai-search-text-input')
  await textInput.fill('banana')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await page.waitForSelector('.scm-ai-search-text-input-suggestion')
  const firstSuggestion = page.locator('.scm-ai-search-text-input-suggestion').first()
  await firstSuggestion.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  await textInput.fill('apple')
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)

  const secondSuggestion = page.locator('.scm-ai-search-text-input-suggestion').nth(1)
  await secondSuggestion.click()
  await page.waitForTimeout(300)
  await rootScreenshot(root, testInfo)
})
