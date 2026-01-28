import integrationHtml from './integration_template.html?raw'

export function createCouponHtml(outputHtml: string, shopTemplateHtml: string, itemTemplateHtml: string) {
  return integrationHtml
    .replaceAll('%OUTPUT%', outputHtml)
    .replaceAll('%SHOP_TEMPLATE%', shopTemplateHtml)
    .replaceAll('%COUPONLIST_ITEM_TEMPLATE%', itemTemplateHtml)
}
