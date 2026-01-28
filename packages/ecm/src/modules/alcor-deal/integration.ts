import integrationHtml from './integration_template.html?raw'
import soloTemplateEndDateHtml from './solo_template_enddate.html?raw'
import soloTemplateReviewNumHtml from './solo_template_review_num.html?raw'
import soloTemplateReviewAvgHtml from './solo_template_review_avg.html?raw'
import soloTemplateBlackHtml from './solo_template_black.html?raw'
import soloTemplateObiHtml from './solo_template_obi.html?raw'
import soloTemplateObiBlackHtml from './solo_template_obi_black.html?raw'
import soloTemplateShopLinkHtml from './solo_template_shop_link.html?raw'

export function createHtml(soloHtml: string, containerClass: string) {
  return integrationHtml.replaceAll('%SOLO%', soloHtml).replaceAll('%CONTAINER_CLASS%', containerClass)
}

// ReviewNum
export const SP1columnPC2ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5ReviewNum = createHtml(
  soloTemplateReviewNumHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)

// ReviewAvg

export const SP1columnPC2ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5ReviewAvg = createHtml(
  soloTemplateReviewAvgHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)

// EndDate

export const SP1columnPC2EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5EndDate = createHtml(
  soloTemplateEndDateHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)

// Black

export const SP1columnPC2Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5Black = createHtml(
  soloTemplateBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)

// Obi

export const SP1columnPC2Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5Obi = createHtml(
  soloTemplateObiHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)

// Obi Black

export const SP1columnPC2ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5ObiBlack = createHtml(
  soloTemplateObiBlackHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)

// Shop Link

export const SP1columnPC2ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC3ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC4ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP1columnPC5ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC2ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-2 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC3ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-3 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC4ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
export const SP2columnPC5ShopLink = createHtml(
  soloTemplateShopLinkHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-5 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
