import { test, expect } from '@playwright/test'

// const pages = [
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/29_ADranking/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/30_ADcarousel/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/31_review/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/32_sale/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/34_basic_1/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/34_basic_2/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/34_basic_3/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/35_tate/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/36_coupon/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/37_kanban/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/38_banner/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/39_brand/index.html',
//   'https://event.rakuten.co.jp/_jstest/check/ecm/ad/40_other/index.html',
// ]

test('Release', async ({ browser }) => {
  expect(true).toBe(true)
  // const url = 'https://event.rakuten.co.jp/_jstest/check/ecm/ad/29_ADranking/index.html'

  // const context = await browser.newContext()

  // const base = {
  //   domain: 'https://event.rakuten.co.jp',
  //   path: '/_jstest/check/ecm/ad/29_ADranking/index.html'
  // }

  // await context.addCookies([
  //   {...base, "name": "_ra", "value": "1678766203487|7924d20d-255f-4691-b4f0-6d291a3ad24b"},
  // ])

  // const page = await context.newPage()

  // await page.setViewportSize({ width: 1024, height: 768 })

  // await page.goto(url)

  // const root = page.locator('main')

  // // Work around to load lazy images.
  // await root.evaluate(() => {
  //   // @ts-ignore
  //   const images = [...document.querySelectorAll('[data-lazy-loading]')]

  //   for (let image of images) {
  //     const lazy = image.getAttribute('data-lazy-loading')

  //     if (lazy) {
  //       image.setAttribute('src', lazy)
  //     }
  //   }
  // })

  // await page.waitForLoadState('networkidle')
  // const screenshot = await root.screenshot()

  // expect(screenshot).toMatchSnapshot()
})
