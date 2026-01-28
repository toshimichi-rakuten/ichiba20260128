import ColumnPriceShop from './col_price_shop.html?raw'
import ColumnPriceName from './col_price_name.html?raw'
import ColumnPriceNameShop from './col_price_name_shop.html?raw'
import ColumnPriceNameReviewShop from './col_price_name_review_shop.html?raw'
import ColumnViewMorePriceShop from './col_view_more_price_shop.html?raw'
import ColumnViewMorePriceName from './col_view_more_price_name.html?raw'
import ColumnViewMorePriceNameShop from './col_view_more_price_name_shop.html?raw'
import ColumnViewMorePriceNameReviewShop from './col_view_more_price_name_review_shop.html?raw'
import SPHorizontalPCColumnPriceShop from './sp_horizontal_price_shop.html?raw'
import SPHorizontalPCColumnPriceName from './sp_horizontal_price_name.html?raw'
import SPHorizontalPCColumnPriceNameShop from './sp_horizontal_price_name_shop.html?raw'
import SPHorizontalPCColumnPriceNameReviewShop from './sp_horizontal_price_name_review_shop.html?raw'
import SPHorizontalPCColumnViewMorePriceShop from './sp_horizontal_view_more_price_shop.html?raw'
import SPHorizontalPCColumnViewMorePriceName from './sp_horizontal_view_more_price_name.html?raw'
import SPHorizontalPCColumnViewMorePriceNameShop from './sp_horizontal_view_more_price_name_shop.html?raw'
import SPHorizontalPCColumnViewMorePriceNameReviewShop from './sp_horizontal_view_more_price_name_review_shop.html?raw'
import SliderPriceShop from './slider_price_shop.html?raw'
import SliderPriceName from './slider_price_name.html?raw'
import SliderPriceNameShop from './slider_price_name_shop.html?raw'
import SliderPriceNameReviewShop from './slider_price_name_review_shop.html?raw'
import SPScrollerPCColumnPriceShop from './sp_scroller_price_shop.html?raw'
import SPScrollerPCColumnPriceName from './sp_scroller_price_name.html?raw'
import SPScrollerPCColumnPriceNameShop from './sp_scroller_price_name_shop.html?raw'
import SPScrollerPCColumnPriceNameReviewShop from './sp_scroller_price_name_review_shop.html?raw'

function replaceInc(template: string) {
  const toItem = (rank: number) => {
    /* eslint-disable no-irregular-whitespace */
    return `
    <div data-alcor-item>
      <div data-key="rank">${rank}</div>
      <div data-key="itemname">
        商品名1商品名1商品名1商品名1商品名1商品名1商品名1
      </div>
      <div data-key="itemurl">#</div>
      <div data-key="imageurl">https://placehold.co/340</div>
      <div data-key="kakaku">9,999,999円</div>
      <div data-key="review_star_avg">
        <img src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
          src="https://r.r10s.jp/com/img/pdt/img/star_on.gif"
        /><img src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
          src="https://r.r10s.jp/com/img/pdt/img/star_on.gif"
        /><img src="https://r.r10s.jp/com/img/pdt/img/star_half.gif" />
      </div>
      <div data-key="reviewave">4.75</div>
      <div data-key="reviewnum">2,136,035</div>
      <div data-key="shopurl">#</div>
      <div data-key="shopname">
        ペットみらい　楽天市場店ペットみらいペットみらい　楽天市場店ペットみら
      </div>
      <div data-key="updatedate">2023/08/30</div>
      <div data-key="updatetime">16:53</div>
    </div>
  `
  }

  const items = [...Array(15).keys()].map((_, i) => toItem(i + 1)).join('')

  return template.replaceAll('<!--#include virtual="★"-->', items)
}

export const staticColumnPriceShopHtml = replaceInc(ColumnPriceShop)
export const staticColumnPriceNameHtml = replaceInc(ColumnPriceName)
export const staticColumnPriceNameShopHtml = replaceInc(ColumnPriceNameShop)
export const staticColumnPriceNameReviewShopHtml = replaceInc(ColumnPriceNameReviewShop)
export const staticColumnViewMorePriceShopHtml = replaceInc(ColumnViewMorePriceShop)
export const staticColumnViewMorePriceNameHtml = replaceInc(ColumnViewMorePriceName)
export const staticColumnViewMorePriceNameShopHtml = replaceInc(ColumnViewMorePriceNameShop)
export const staticColumnViewMorePriceNameReviewShopHtml = replaceInc(ColumnViewMorePriceNameReviewShop)
export const staticSPHorizontalPCColumnPriceShopHtml = replaceInc(SPHorizontalPCColumnPriceShop)
export const staticSPHorizontalPCColumnPriceNameHtml = replaceInc(SPHorizontalPCColumnPriceName)
export const staticSPHorizontalPCColumnPriceNameShopHtml = replaceInc(SPHorizontalPCColumnPriceNameShop)
export const staticSPHorizontalPCColumnPriceNameReviewShopHtml = replaceInc(SPHorizontalPCColumnPriceNameReviewShop)
export const staticSPHorizontalPCColumnViewMorePriceShopHtml = replaceInc(SPHorizontalPCColumnViewMorePriceShop)
export const staticSPHorizontalPCColumnViewMorePriceNameHtml = replaceInc(SPHorizontalPCColumnViewMorePriceName)
export const staticSPHorizontalPCColumnViewMorePriceNameShopHtml = replaceInc(SPHorizontalPCColumnViewMorePriceNameShop)
export const staticSPHorizontalPCColumnViewMorePriceNameReviewShopHtml = replaceInc(
  SPHorizontalPCColumnViewMorePriceNameReviewShop
)
export const staticSliderPriceShopHtml = replaceInc(SliderPriceShop)
export const staticSliderPriceNameHtml = replaceInc(SliderPriceName)
export const staticSliderPriceNameShopHtml = replaceInc(SliderPriceNameShop)
export const staticSliderPriceNameReviewShopHtml = replaceInc(SliderPriceNameReviewShop)
export const staticSPScrollerPCColumnPriceShopHtml = replaceInc(SPScrollerPCColumnPriceShop)
export const staticSPScrollerPCColumnPriceNameHtml = replaceInc(SPScrollerPCColumnPriceName)
export const staticSPScrollerPCColumnPriceNameShopHtml = replaceInc(SPScrollerPCColumnPriceNameShop)
export const staticSPScrollerPCColumnPriceNameReviewShopHtml = replaceInc(SPScrollerPCColumnPriceNameReviewShop)
