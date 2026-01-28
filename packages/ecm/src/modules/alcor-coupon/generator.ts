import { createCouponHtml } from './integration'
import { replaceInc } from './static'

import outputTemplateTypeCouponHtml from './generator_output_template_coupon.html?raw'
import outputTemplateTypeCouponWithItemHtml from './generator_output_template_coupon_with_item.html?raw'
import outputTemplateTypeItemHtml from './generator_output_template_item.html?raw'
import outputTemplateTypeItemWithViewMoreHtml from './generator_output_template_item_with_view_more.html?raw'
import itemWrapperWithViewMoreHtml from './generator_item_wrapper_with_view_more.html?raw'
import itemWrapperHtml from './generator_item_wrapper.html?raw'
import itemTemplateHtml from './generator_item_template.html?raw'
import soloItemHtml from './solo_item.html?raw'
import soloCouponHtml from './solo_coupon.html?raw'

export type ConfigProps = {
  type: 'coupon' | 'couponWithItem' | 'item'
  viewMore: boolean
  viewMoreVisible?: number
  viewMoreVisibleMd?: number
  spColumn: number
  pcColumn: number
}

function generateItemContainer(props: ConfigProps) {
  if (props.type === 'item') {
    return '###items###'
  } else if (props.type === 'couponWithItem') {
    let outputHtml = itemWrapperHtml

    if (props.viewMore) {
      outputHtml = itemWrapperWithViewMoreHtml
      if (props.viewMoreVisible !== props.viewMoreVisibleMd) {
        outputHtml = outputHtml.replace(
          '%%VIEW_MORE_VISIBLE%%',
          `data-visible="${(props.viewMoreVisible ?? '').toString()}"\n  data-md-visible="${(props.viewMoreVisibleMd ?? '').toString()}"`
        )
      } else {
        outputHtml = outputHtml.replace(
          '%%VIEW_MORE_VISIBLE%%',
          `data-visible="${(props.viewMoreVisible ?? '').toString()}"`
        )
      }
    }

    outputHtml = outputHtml.replace(
      '%%GENERATOR_COLUMN_CLASS%%',
      `d-grid-col-${props.spColumn} md-d-grid-col-${props.pcColumn}`
    )
    return outputHtml
  } else if (props.type === 'coupon') {
    return ''
  }
  throw new Error(`Invalid type ${props.type}`)
}

function generateItemTemplate(props: ConfigProps) {
  if (props.type === 'coupon') {
    return ''
  }

  let itemTemplate = itemTemplateHtml

  if (props.viewMore) {
    const viewMoreTemplate = `<div class="ecm-view-more-item" aria-hidden="true">\n${soloItemHtml}</div>`
    itemTemplate = itemTemplate.replace('%%ITEM_TEMPLATE%%', viewMoreTemplate)
  } else {
    itemTemplate = itemTemplate.replace('%%ITEM_TEMPLATE%%', soloItemHtml)
  }

  return itemTemplate
}

function generateOutput(props: ConfigProps) {
  if (props.type === 'coupon') {
    return outputTemplateTypeCouponHtml
  } else if (props.type === 'couponWithItem') {
    return outputTemplateTypeCouponWithItemHtml
  } else {
    const columnClass = `d-grid-col-${props.spColumn} md-d-grid-col-${props.pcColumn}`
    let outputHtml = props.viewMore ? outputTemplateTypeItemWithViewMoreHtml : outputTemplateTypeItemHtml
    outputHtml = outputHtml.replace('%%GENERATOR_COLUMN_CLASS%%', columnClass)
    if (props.viewMoreVisible !== props.viewMoreVisibleMd) {
      outputHtml = outputHtml.replace(
        '%%VIEW_MORE_VISIBLE%%',
        `data-visible="${(props.viewMoreVisible ?? '').toString()}"\n  data-md-visible="${(props.viewMoreVisibleMd ?? '').toString()}"`
      )
    } else {
      outputHtml = outputHtml.replace(
        '%%VIEW_MORE_VISIBLE%%',
        `data-visible="${(props.viewMoreVisible ?? '').toString()}"`
      )
    }
    return outputHtml
  }
}

export function generateIntegration(props: ConfigProps) {
  const outputHtml = generateOutput(props)
  const couponWithItemHtml = soloCouponHtml + '\n' + generateItemContainer(props)
  const couponHtml = soloCouponHtml
  const itemTemplateHtml = generateItemTemplate(props)

  if (props.type === 'coupon') {
    return createCouponHtml(outputHtml, couponHtml, itemTemplateHtml)
  } else if (props.type === 'couponWithItem') {
    return createCouponHtml(outputHtml, couponWithItemHtml, itemTemplateHtml)
  } else if (props.type === 'item') {
    return createCouponHtml(outputHtml, '###items###', itemTemplateHtml)
  }
  throw new Error(`Invalid type ${props.type}`)
}

export function generateStatic(props: ConfigProps) {
  let templateHtml = generateIntegration(props)

  return replaceInc(templateHtml)
}
