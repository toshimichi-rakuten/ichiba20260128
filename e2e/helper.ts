import { test, expect, devices } from '@playwright/test'

export const ROOT_PATH = process.env.CI ? process.env.STORYBOOK_URL : 'http://localhost:8080'

export const SCM_ROOT_PATH = process.env.CI ? process.env.STORYBOOK_URL : 'http://localhost:8081'

export const FET_ROOT_PATH = process.env.CI ? process.env.STORYBOOK_URL : 'http://localhost:8082'

// @ts-ignore
export function snapshot({ name, url, device = 'sp' }) {
  test(name, async ({ page }, testInfo) => {
    if (device.toLowerCase() === 'sp') {
      await page.setViewportSize(devices['iPhone 6'].viewport)
    }

    if (device.toLowerCase() === 'md') {
      await page.setViewportSize({ width: 768, height: 1024 })
    }

    if (device.toLowerCase() === '704') {
      await page.setViewportSize({ width: 704, height: 1024 })
    }

    if (device.toLowerCase() === 'lg') {
      await page.setViewportSize({ width: 1024, height: 768 })
    }

    if (device.toLowerCase() === 'xl') {
      await page.setViewportSize({ width: 1366, height: 768 })
    }

    // MD size is default
    await page.goto(url)

    await page.waitForLoadState('networkidle')
    const root = page.locator('body')

    // Work around to load lazy images.
    await root.evaluate(() => {
      // @ts-ignore
      const images = [...document.querySelectorAll('[data-lazy-loading]')]

      for (let image of images) {
        const lazy = image.getAttribute('data-lazy-loading')

        if (lazy) {
          image.setAttribute('src', lazy)
        }
      }
    })

    await page.waitForLoadState('networkidle')
    await rootScreenshot(root, testInfo)
  })
}

// Don't forget to use "await"
// await rootScreenshot()
// @ts-ignore
export async function rootScreenshot(root, testInfo) {
  const screenshot = await root.screenshot()
  expect(screenshot).toMatchSnapshot()

  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  })
}
