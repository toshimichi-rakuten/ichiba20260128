import testHtml from './test-data-html/test.html?raw'

const couponInc = '<!--#include virtual="★"-->'

export function replaceInc(template: string) {
  return template.replaceAll(couponInc, testHtml)
}

export function replaceSoloTemplate(html: string) {
  let soloHtml = html
  soloHtml = soloHtml.replace('###couponGetUrl###', '#')
  soloHtml = soloHtml.replace('###couponImage###', 'https://placehold.co/304')
  soloHtml = soloHtml.replace('###couponName###', 'クーポン名クーポン名クーポン名クーポン名')
  soloHtml = soloHtml.replace('###discountFactor###', '30%OFF')
  soloHtml = soloHtml.replace('###couponEndDate###', '2025/05/24 15:59')
  soloHtml = soloHtml.replace('###shopName###', 'ショップ名ショップ名')

  soloHtml = soloHtml.replace('###itemUrl###', '#')
  soloHtml = soloHtml.replace('###imageUrl###', 'https://placehold.co/686')
  soloHtml = soloHtml.replace('###itemName###', '商品名 Item Name 商品名 Item Name 商品名 Item Name 商品名 Item Name')
  soloHtml = soloHtml.replace('###kakaku###', '999,999円')

  return soloHtml
}
