import { snapshot, ROOT_PATH, rootScreenshot } from '../../../../../e2e/helper'
import { test, Page } from '@playwright/test'

snapshot({
  name: 'Slider Default SP',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-slider--default`,
  device: 'sp',
})

snapshot({
  name: 'Slider Default MD',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-slider--default`,
  device: 'md',
})

snapshot({
  name: 'Slider Default LG',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-slider--default`,
  device: 'lg',
})

snapshot({
  name: 'Slider Default XL',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-slider--default`,
  device: 'xl',
})

test('Slider Tabbed', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-slider--tabbed&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await waitForImagesInElement(page, 'tabUnstyledPanel1')
  await rootScreenshot(page, testInfo)

  await page.locator('text=Tab 2').click()
  await page.waitForLoadState('networkidle')
  await waitForImagesInElement(page, 'tabUnstyledPanel2')
  await rootScreenshot(page, testInfo)

  await page.locator('text=Tab 3').click()
  await page.waitForLoadState('networkidle')
  await waitForImagesInElement(page, 'tabUnstyledPanel3')
  await rootScreenshot(page, testInfo)
})

test('Slider Dynamic Slides', async ({ page }, testInfo) => {
  await page.goto(`${ROOT_PATH}/iframe.html?args=&id=modules-slider--dynamic-slides&viewMode=story`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)

  await page.locator('#addSlide').click()
  await page.waitForTimeout(200)
  await page.locator('#addSlide').click()
  await page.waitForTimeout(200)
  await page.locator('#addSlide').click()
  await page.waitForTimeout(200)
  await page.locator('#addSlide').click()
  await page.waitForTimeout(500)

  await page.locator('.ecm-slider-next').click()
  await page.waitForTimeout(500)
  await rootScreenshot(page, testInfo)
})

async function waitForImagesInElement(page: Page, elementId: string) {
  // Wait for the panel to be visible
  await page.waitForSelector(`#${elementId}`, { state: 'visible' })

  // Wait until all images in the panel have a non-empty src
  await page.waitForFunction((panelId) => {
    const panel = document.getElementById(panelId)
    if (!panel) return false
    const images = Array.from(panel.querySelectorAll('img'))
    // Wait until all images have a non-empty src
    return images.length > 0 && images.every((img) => img.src && img.src.trim() !== '')
  }, elementId)

  // Wait for all images to be fully loaded and decoded
  await page.evaluate(async (panelId) => {
    const panel = document.getElementById(panelId)
    if (!panel) return
    const images = Array.from(panel.querySelectorAll('img'))
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve()
        if (img.decode) return img.decode().catch(() => {})
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })
      })
    )
  }, elementId)

  await page.waitForTimeout(500)
}
