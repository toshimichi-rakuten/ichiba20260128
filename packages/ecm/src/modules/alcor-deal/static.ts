import {
  SP1columnPC2ReviewNum,
  SP1columnPC3ReviewNum,
  SP1columnPC4ReviewNum,
  SP1columnPC5ReviewNum,
  SP2columnPC2ReviewNum,
  SP2columnPC3ReviewNum,
  SP2columnPC4ReviewNum,
  SP2columnPC5ReviewNum,
  SP1columnPC2ReviewAvg,
  SP1columnPC3ReviewAvg,
  SP1columnPC4ReviewAvg,
  SP1columnPC5ReviewAvg,
  SP2columnPC2ReviewAvg,
  SP2columnPC3ReviewAvg,
  SP2columnPC4ReviewAvg,
  SP2columnPC5ReviewAvg,
  SP1columnPC2EndDate,
  SP1columnPC3EndDate,
  SP1columnPC4EndDate,
  SP1columnPC5EndDate,
  SP2columnPC2EndDate,
  SP2columnPC3EndDate,
  SP2columnPC4EndDate,
  SP2columnPC5EndDate,
  SP1columnPC2Black,
  SP1columnPC3Black,
  SP1columnPC4Black,
  SP1columnPC5Black,
  SP2columnPC2Black,
  SP2columnPC3Black,
  SP2columnPC4Black,
  SP2columnPC5Black,
  SP1columnPC2Obi,
  SP1columnPC3Obi,
  SP1columnPC4Obi,
  SP1columnPC5Obi,
  SP2columnPC2Obi,
  SP2columnPC3Obi,
  SP2columnPC4Obi,
  SP2columnPC5Obi,
  SP1columnPC2ObiBlack,
  SP1columnPC3ObiBlack,
  SP1columnPC4ObiBlack,
  SP1columnPC5ObiBlack,
  SP2columnPC2ObiBlack,
  SP2columnPC3ObiBlack,
  SP2columnPC4ObiBlack,
  SP2columnPC5ObiBlack,
  SP1columnPC2ShopLink,
  SP1columnPC3ShopLink,
  SP1columnPC4ShopLink,
  SP1columnPC5ShopLink,
  SP2columnPC2ShopLink,
  SP2columnPC3ShopLink,
  SP2columnPC4ShopLink,
  SP2columnPC5ShopLink,
} from './integration'

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
      <div data-key="shopname">店舗名1店舗名1</div>
    </div>
  `
  }

  const items = [...Array(15).keys()].map(() => toItem()).join('')

  return template.replaceAll('<!--#include virtual="★"-->', items)
}

export const staticSP1columnPC2ReviewNum = replaceInc(SP1columnPC2ReviewNum)
export const staticSP1columnPC3ReviewNum = replaceInc(SP1columnPC3ReviewNum)
export const staticSP1columnPC4ReviewNum = replaceInc(SP1columnPC4ReviewNum)
export const staticSP1columnPC5ReviewNum = replaceInc(SP1columnPC5ReviewNum)
export const staticSP2columnPC2ReviewNum = replaceInc(SP2columnPC2ReviewNum)
export const staticSP2columnPC3ReviewNum = replaceInc(SP2columnPC3ReviewNum)
export const staticSP2columnPC4ReviewNum = replaceInc(SP2columnPC4ReviewNum)
export const staticSP2columnPC5ReviewNum = replaceInc(SP2columnPC5ReviewNum)
export const staticSP1columnPC2ReviewAvg = replaceInc(SP1columnPC2ReviewAvg)
export const staticSP1columnPC3ReviewAvg = replaceInc(SP1columnPC3ReviewAvg)
export const staticSP1columnPC4ReviewAvg = replaceInc(SP1columnPC4ReviewAvg)
export const staticSP1columnPC5ReviewAvg = replaceInc(SP1columnPC5ReviewAvg)
export const staticSP2columnPC2ReviewAvg = replaceInc(SP2columnPC2ReviewAvg)
export const staticSP2columnPC3ReviewAvg = replaceInc(SP2columnPC3ReviewAvg)
export const staticSP2columnPC4ReviewAvg = replaceInc(SP2columnPC4ReviewAvg)
export const staticSP2columnPC5ReviewAvg = replaceInc(SP2columnPC5ReviewAvg)
export const staticSP1columnPC2EndDate = replaceInc(SP1columnPC2EndDate)
export const staticSP1columnPC3EndDate = replaceInc(SP1columnPC3EndDate)
export const staticSP1columnPC4EndDate = replaceInc(SP1columnPC4EndDate)
export const staticSP1columnPC5EndDate = replaceInc(SP1columnPC5EndDate)
export const staticSP2columnPC2EndDate = replaceInc(SP2columnPC2EndDate)
export const staticSP2columnPC3EndDate = replaceInc(SP2columnPC3EndDate)
export const staticSP2columnPC4EndDate = replaceInc(SP2columnPC4EndDate)
export const staticSP2columnPC5EndDate = replaceInc(SP2columnPC5EndDate)
export const staticSP1columnPC2Black = replaceInc(SP1columnPC2Black)
export const staticSP1columnPC3Black = replaceInc(SP1columnPC3Black)
export const staticSP1columnPC4Black = replaceInc(SP1columnPC4Black)
export const staticSP1columnPC5Black = replaceInc(SP1columnPC5Black)
export const staticSP2columnPC2Black = replaceInc(SP2columnPC2Black)
export const staticSP2columnPC3Black = replaceInc(SP2columnPC3Black)
export const staticSP2columnPC4Black = replaceInc(SP2columnPC4Black)
export const staticSP2columnPC5Black = replaceInc(SP2columnPC5Black)
export const staticSP1columnPC2Obi = replaceInc(SP1columnPC2Obi)
export const staticSP1columnPC3Obi = replaceInc(SP1columnPC3Obi)
export const staticSP1columnPC4Obi = replaceInc(SP1columnPC4Obi)
export const staticSP1columnPC5Obi = replaceInc(SP1columnPC5Obi)
export const staticSP2columnPC2Obi = replaceInc(SP2columnPC2Obi)
export const staticSP2columnPC3Obi = replaceInc(SP2columnPC3Obi)
export const staticSP2columnPC4Obi = replaceInc(SP2columnPC4Obi)
export const staticSP2columnPC5Obi = replaceInc(SP2columnPC5Obi)
export const staticSP1columnPC2ObiBlack = replaceInc(SP1columnPC2ObiBlack)
export const staticSP1columnPC3ObiBlack = replaceInc(SP1columnPC3ObiBlack)
export const staticSP1columnPC4ObiBlack = replaceInc(SP1columnPC4ObiBlack)
export const staticSP1columnPC5ObiBlack = replaceInc(SP1columnPC5ObiBlack)
export const staticSP2columnPC2ObiBlack = replaceInc(SP2columnPC2ObiBlack)
export const staticSP2columnPC3ObiBlack = replaceInc(SP2columnPC3ObiBlack)
export const staticSP2columnPC4ObiBlack = replaceInc(SP2columnPC4ObiBlack)
export const staticSP2columnPC5ObiBlack = replaceInc(SP2columnPC5ObiBlack)
export const staticSP1columnPC2ShopLink = replaceInc(SP1columnPC2ShopLink)
export const staticSP1columnPC3ShopLink = replaceInc(SP1columnPC3ShopLink)
export const staticSP1columnPC4ShopLink = replaceInc(SP1columnPC4ShopLink)
export const staticSP1columnPC5ShopLink = replaceInc(SP1columnPC5ShopLink)
export const staticSP2columnPC2ShopLink = replaceInc(SP2columnPC2ShopLink)
export const staticSP2columnPC3ShopLink = replaceInc(SP2columnPC3ShopLink)
export const staticSP2columnPC4ShopLink = replaceInc(SP2columnPC4ShopLink)
export const staticSP2columnPC5ShopLink = replaceInc(SP2columnPC5ShopLink)
