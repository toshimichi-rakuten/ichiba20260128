import soloTemplate from './solo_template.html?raw'
import { SP2columnPC4column } from './integration'

export function replaceTemplate(template: string, mockData: { [key: string]: string } = {}) {
  let result = template
  result = result.replaceAll('###itemname###', '商品名1商品名1商品名1商品名1商品名1商品名1商品名1')
  result = result.replaceAll('###item-url###', '#')
  result = result.replaceAll('###deal-point-rate-base###', mockData['deal-point-rate-base'] ?? '20')
  result = result.replaceAll('###image-url###', 'https://placehold.co/340')
  result = result.replaceAll('###stock-flg###', mockData['stock-flg'] ?? '10')
  result = result.replaceAll('###kakaku###', '9,999,999円')
  result = result.replaceAll('###deal-end-date###', '2024/09/08 09:59:59')
  result = result.replaceAll('###updatetime###', '2024/09/08 09:59:59')
  result = result.replaceAll(
    '###review_star_avg###',
    `
    <img src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
      src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
      src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
      src="https://r.r10s.jp/com/img/pdt/img/star_on.gif" /><img
      src="https://r.r10s.jp/com/img/pdt/img/star_half.gif" />
  `
  )

  result = result.replaceAll('###reviewave###', '4.75')
  result = result.replaceAll('###reviewnum###', '2,136,035')
  result = result.replaceAll('###shopurl###', '#')
  result = result.replaceAll('###shopname###', '店舗名1店舗名1')
  result = result.replaceAll('###itemid###', '00000000')
  result = result.replaceAll('###shopid###', '000000')

  return result
}

export function replaceInc(template: string, mockData: { [key: string]: string } = {}) {
  const pointRateBase = mockData['deal-point-rate-base'] ?? 20

  const toItem = () => {
    /* eslint-disable no-irregular-whitespace */
    return `
    <div data-alcor-item>
      <div data-key="itemname">
        商品名1商品名1商品名1商品名1商品名1商品名1商品名1
      </div>
      <div data-key="item-url">#</div>
      <div data-key="deal-point-rate-base">${pointRateBase}</div>
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
      <div data-key="deal-end-date">2024/09/08 09:59:59</div>
      <div data-key="stock-flg">${mockData['stock-flg'] ?? '10'}</div>
      <div data-key="updatetime">2024/09/08 09:59:59</div>
      <div data-key="shopurl">#</div>
      <div data-key="itemid">00000000</div>
      <div data-key="shopid">000000</div>
    </div>
  `
  }

  const items = [...Array(15).keys()].map(() => toItem()).join('')

  return template.replaceAll('<!--#include virtual="★"-->', items)
}

export const staticSoloTemplate = replaceTemplate(soloTemplate)
export const staticSP2columnPC4column = replaceInc(SP2columnPC4column)
