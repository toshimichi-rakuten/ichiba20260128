import { test } from '@playwright/test'
import { rootScreenshot, ROOT_PATH } from '../../../../../e2e/helper'

test('Hover', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-hover--default&viewMode=story`)

  await page.waitForLoadState('networkidle')
  const body = page.locator('body')

  // hover the trigger
  await page.hover('[aria-controls="hover1"]')
  await page.waitForSelector('#hover1[aria-hidden="false"]')

  // hover the body
  await page.hover('#hover1')
  await page.waitForTimeout(300)

  // body should still be visible
  await rootScreenshot(body, testInfo)
})

test('Hover Attach', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?id=modules-hover--attach&viewMode=story`)

  await page.waitForLoadState('networkidle')
  const body = page.locator('body')

  // hover the trigger
  await page.hover('[aria-controls="hover1"]')
  await page.waitForSelector('#hover1[aria-hidden="false"]')

  // hover the body
  await page.hover('#hover1')
  await page.waitForTimeout(300)

  // body should still be visible
  await rootScreenshot(body, testInfo)
})
