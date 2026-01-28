import { snapshot } from '../../../../../e2e/helper'

const ROOT_PATH = process.env.CI ? process.env.STORYBOOK_URL_ALCOR : 'http://localhost:8080'

snapshot({
  name: 'Alcor Normal Solo',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--solo&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal SP Column Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Column Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Column PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Column PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Column PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Column PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Column PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Column PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--column-price-name-review-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP HorizontalColumn Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC HorizontalColumn Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP HorizontalColumn PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC HorizontalColumn PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP HorizontalColumn PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC HorizontalColumn PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP HorizontalColumn PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC HorizontalColumn PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--sp-horizontal-pc-column-price-name-review-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-price-name-review-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider2 Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider2 Price',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider2 PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price-name`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider2 PriceName',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price-name`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider2 PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price-name-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider2 PriceNameShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price-name-shop`,
  device: 'lg',
})

snapshot({
  name: 'Alcor Normal SP Slider2 PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price-name-review-shop`,
  device: 'sp',
})

snapshot({
  name: 'Alcor Normal PC Slider2 PriceNameReviewShop',
  url: `${ROOT_PATH}/iframe.html?viewMode=story&id=modules-alcornormal--slider-2-price-name-review-shop`,
  device: 'lg',
})
