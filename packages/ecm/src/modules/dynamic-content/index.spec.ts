import { ROOT_PATH } from '../../../../../e2e/helper'
import { test, expect } from '@playwright/test'
import { ECM_INITIALIZED_ATTRIBUTE } from '../../core/constants'

test('DynamicContent Dynamic HTML', async ({ page }) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-dynamiccontent--default&viewMode=story`)
  await page.waitForLoadState('networkidle')

  // Code that adds dynamic HTML is in Story.
  const viewMore = page.locator('#view-more-1')
  const init = await viewMore.getAttribute(ECM_INITIALIZED_ATTRIBUTE)
  expect(init).toBe('true')
})

test('[DynamicContent] Static HTML', async ({ page }) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-dynamiccontent--init&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const viewMore = page.locator('#view-more-2')
  const init = await viewMore.getAttribute(ECM_INITIALIZED_ATTRIBUTE)
  expect(init).toBe('true')
})

test('[DynamicContent] It should initialize single HTML via CustomEvent', async ({ page }) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-dynamiccontent--event-single&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const autoParameter = page.getByTestId('autoparameter')
  const isInit = await autoParameter.getAttribute(ECM_INITIALIZED_ATTRIBUTE)
  expect(isInit).toBe('true')
})

test('[DynamicContent] It should initialize block HTML via CustomEvent', async ({ page }) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-dynamiccontent--event-block&viewMode=story`)
  await page.waitForLoadState('networkidle')

  const autoParameter = page.getByTestId('autoparameter')
  const isInit = await autoParameter.getAttribute(ECM_INITIALIZED_ATTRIBUTE)
  expect(isInit).toBe('true')
})
