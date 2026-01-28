import { createHtml } from '@ecm/modules/alcor-deal/integration'
import { replaceInc, replaceTemplate } from '@ecm/modules/alcor-deal/static'

import baseHtml from '@ecm/modules/alcor-deal/generator_base_template.html?raw'
import badgeBlackHtml from '@ecm/modules/alcor-deal/generator_badge_black_template.html?raw'
import badgeRedHtml from '@ecm/modules/alcor-deal/generator_badge_template.html?raw'
import endDateHtml from '@ecm/modules/alcor-deal/generator_end_date_template.html?raw'
import obiBlackHtml from '@ecm/modules/alcor-deal/generator_obi_black_template.html?raw'
import obiRedHtml from '@ecm/modules/alcor-deal/generator_obi_template.html?raw'
import reviewAvgHtml from '@ecm/modules/alcor-deal/generator_review_avg_template.html?raw'
import reviewNumHtml from '@ecm/modules/alcor-deal/generator_review_num_template.html?raw'
import shopLinkHtml from '@ecm/modules/alcor-deal/generator_shop_link_template.html?raw'

export type ConfigBadgeProps = 'red' | 'black' | 'obi_red' | 'obi_black'
export type ConfigReviewProps = 'avg' | 'num' | 'none'
export type ConfigOutOfStockProps = 'true' | 'false'
export type ConfigSpColumnProps = '1' | '2'
export type ConfigPcColumnProps = '2' | '3' | '4' | '5'
export type ConfigEndDateProps = 'true' | 'false'
export type ConfigShopLinkProps = 'true' | 'false'
export type ConfigShowEmptyPointback = 'true' | 'false'

export type ConfigProps = {
  endDate: ConfigEndDateProps
  badge: ConfigBadgeProps
  review: ConfigReviewProps
  spColumn: ConfigSpColumnProps
  pcColumn: ConfigPcColumnProps
  shopLink: ConfigShopLinkProps
  hideEmptyPointback: ConfigShowEmptyPointback
}

export function generateSolo(props: ConfigProps) {
  let soloHtml = baseHtml

  if (props.endDate === 'true') {
    soloHtml = soloHtml.replace('%%GENERATOR_END_DATE%%', endDateHtml)
  } else {
    soloHtml = soloHtml.replace('%%GENERATOR_END_DATE%%', '')
  }

  if (props.badge === 'red') {
    soloHtml = soloHtml.replace('%%GENERATOR_OBI_BADGE%%', badgeRedHtml)
  } else if (props.badge === 'black') {
    soloHtml = soloHtml.replace('%%GENERATOR_OBI_BADGE%%', badgeBlackHtml)
  } else if (props.badge === 'obi_red') {
    soloHtml = soloHtml.replace('%%GENERATOR_OBI_BADGE%%', obiRedHtml)
  } else if (props.badge === 'obi_black') {
    soloHtml = soloHtml.replace('%%GENERATOR_OBI_BADGE%%', obiBlackHtml)
  } else {
    soloHtml = soloHtml.replace('%%GENERATOR_OBI_BADGE%%', '')
  }

  if (props.review === 'avg') {
    soloHtml = soloHtml.replace('%%GENERATOR_REVIEW%%', reviewAvgHtml)
  } else if (props.review === 'num') {
    soloHtml = soloHtml.replace('%%GENERATOR_REVIEW%%', reviewNumHtml)
  } else {
    soloHtml = soloHtml.replace('%%GENERATOR_REVIEW%%', '')
  }

  if (props.shopLink === 'true') {
    soloHtml = soloHtml.replace('%%GENERATOR_SHOP_LINK%%', shopLinkHtml)
  } else {
    soloHtml = soloHtml.replace('%%GENERATOR_SHOP_LINK%%', '')
  }

  if (props.hideEmptyPointback === 'true') {
    soloHtml = soloHtml.replace(
      '%%GENERATOR_HIDE_EMPTY_POINTBACK%%',
      'ecm-deal-alcor-badge-rate-###deal-point-rate-base###'
    )
  } else {
    // It's a modifier class. Keep the space in the beginning.
    soloHtml = soloHtml.replace(' %%GENERATOR_HIDE_EMPTY_POINTBACK%%', '')
  }

  return soloHtml
}

export function generateIntegration(props: ConfigProps) {
  const soloHtml = generateSolo(props)

  const containerClass = `d-grid d-grid-col-${props.spColumn} md-d-grid-col-${props.pcColumn}`

  const gapMap = {
    '2': {
      '1': 'd-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
      '2': 'd-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
    },
    '3': {
      '1': 'd-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
      '2': 'd-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
    },
    '4': {
      '1': 'd-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
      '2': 'd-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
    },
    '5': {
      '1': 'd-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
      '2': 'd-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-gap-x-24 md-d-grid-gap-y-32',
    },
  }

  return createHtml(soloHtml, `${containerClass} ${gapMap[props.pcColumn][props.spColumn]}`)
}

export function generateStaticSolo(props: ConfigProps, mockData: { [key: string]: string } = {}) {
  const solo = generateSolo(props)
  return replaceTemplate(solo, mockData)
}

export function generateStatic(props: ConfigProps, mockData: { [key: string]: string } = {}) {
  const integration = generateIntegration(props)
  return replaceInc(integration, mockData)
}
