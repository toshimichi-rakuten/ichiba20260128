import ColumnPrice from './col_price.html?raw'
import ColumnPriceName from './col_price_name.html?raw'
import ColumnPriceNameShop from './col_price_name_shop.html?raw'
import ColumnPriceNameReviewShop from './col_price_name_review_shop.html?raw'
import SPHorizontalPCColumnPrice from './sp_horizontal_price.html?raw'
import SPHorizontalPCColumnPriceName from './sp_horizontal_price_name.html?raw'
import SPHorizontalPCColumnPriceNameShop from './sp_horizontal_price_name_shop.html?raw'
import SPHorizontalPCColumnPriceNameReviewShop from './sp_horizontal_price_name_review_shop.html?raw'
import SliderPrice from './slider_price.html?raw'
import SliderPriceName from './slider_price_name.html?raw'
import SliderPriceNameShop from './slider_price_name_shop.html?raw'
import SliderPriceNameReviewShop from './slider_price_name_review_shop.html?raw'
import Slider2Price from './slider_2_price.html?raw'
import Slider2PriceName from './slider_2_price_name.html?raw'
import Slider2PriceNameShop from './slider_2_price_name_shop.html?raw'
import Slider2PriceNameReviewShop from './slider_2_price_name_review_shop.html?raw'

function replaceInc(template: string) {
  const toItem = () => {
    /* eslint-disable no-irregular-whitespace */
    return `
    <div data-alcor-item>
      <div data-key="itemname">
        商品名1商品名1商品名1商品名1商品名1商品名1商品名1
      </div>
      <div data-key="item-url">#</div>
      <div data-key="image-url">https://placehold.co/340</div>
      <div data-key="kakaku">9,999,999円</div>
      <div data-key="review_star_avg">
        <img src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
          src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
          src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
          src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
          src="https://r.r10s.jp/com/img/pdt/img/star_half.gif" />
      </div>
      <div data-key="reviewave">4.75</div>
      <div data-key="reviewnum">2,136,035</div>
      <div data-key="shopurl">#</div>
      <div data-key="shopname">
        ペットみらい　楽天市場店ペットみらいペットみらい　楽天市場店ペットみら
      </div>
    </div>
  `
  }

  const items = [...Array(15).keys()].map(() => toItem()).join('')

  return template.replaceAll('<!--#include virtual="★"-->', items)
}

export const staticColumnPriceHtml = replaceInc(ColumnPrice)
export const staticColumnPriceNameHtml = replaceInc(ColumnPriceName)
export const staticColumnPriceNameShopHtml = replaceInc(ColumnPriceNameShop)
export const staticColumnPriceNameReviewShopHtml = replaceInc(ColumnPriceNameReviewShop)
export const staticSPHorizontalPCColumnPriceHtml = replaceInc(SPHorizontalPCColumnPrice)
export const staticSPHorizontalPCColumnPriceNameHtml = replaceInc(SPHorizontalPCColumnPriceName)
export const staticSPHorizontalPCColumnPriceNameShopHtml = replaceInc(SPHorizontalPCColumnPriceNameShop)
export const staticSPHorizontalPCColumnPriceNameReviewShopHtml = replaceInc(SPHorizontalPCColumnPriceNameReviewShop)
export const staticSliderPriceHtml = replaceInc(SliderPrice)
export const staticSliderPriceNameHtml = replaceInc(SliderPriceName)
export const staticSliderPriceNameShopHtml = replaceInc(SliderPriceNameShop)
export const staticSliderPriceNameReviewShopHtml = replaceInc(SliderPriceNameReviewShop)
export const staticSlider2PriceHtml = replaceInc(Slider2Price)
export const staticSlider2PriceNameHtml = replaceInc(Slider2PriceName)
export const staticSlider2PriceNameShopHtml = replaceInc(Slider2PriceNameShop)
export const staticSlider2PriceNameReviewShopHtml = replaceInc(Slider2PriceNameReviewShop)
