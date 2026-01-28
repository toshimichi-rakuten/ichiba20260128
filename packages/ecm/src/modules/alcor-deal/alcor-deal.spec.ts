import { test } from '@playwright/test'
import { ROOT_PATH, snapshot, rootScreenshot } from '../../../../../e2e/helper'

snapshot({
  name: 'Solo End Date',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-end-date`,
  device: 'sp',
})

snapshot({
  name: 'Solo End Date No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-end-date-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Avg',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Avg No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Num',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Num No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Avg Black',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-black`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Avg Black No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-black-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Num Black',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-black`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Num Black No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-black-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Avg Obi',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-obi`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Avg Obi No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-obi-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Num Obi',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-obi`,
  device: 'sp',
})

snapshot({
  name: 'Solo Review Num Obi No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-obi-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Obi Review Avg Obi Black',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-obi-black`,
  device: 'sp',
})

snapshot({
  name: 'Solo Obi Review Avg Obi Black No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-avg-obi-black-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Obi Review Num Obi Black',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-obi-black`,
  device: 'sp',
})

snapshot({
  name: 'Solo Obi Review Num Obi Black No Stock',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-review-num-obi-black-no-stock`,
  device: 'sp',
})

snapshot({
  name: 'Solo Shop Link',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--solo-shop-link`,
  device: 'sp',
})

test('Shop Link Hover', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--sp-1-column-pc-2-shop-link`)
  await page.waitForLoadState('networkidle')

  await page.addStyleTag({ content: '.ecm-deal-alcor { padding: 16px; }' })
  const root = page.locator('.ecm-deal-alcor:nth-child(1)').first()
  await rootScreenshot(root, testInfo)

  const shopLink = page.locator('.ecm-deal-alcor:nth-child(1) > .ecm-alcor-shop-link').first()
  await shopLink.hover()
  await page.waitForTimeout(500)

  await rootScreenshot(root, testInfo)
})

snapshot({
  name: 'Update Time PC',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--sp-2-column-pc-4-end-date`,
  device: 'pc',
})

snapshot({
  name: 'Update Time SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcordeal--sp-2-column-pc-4-end-date`,
  device: 'sp',
})
