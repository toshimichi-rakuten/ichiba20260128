export function templates(): HTMLTemplateElement[] {
  const htmlString = [
    {
      name: 'result',
      content: `
        <div>All: ###rate### / ###maxRate###</div>
        <div style="padding-left: 32px; display: grid; grid-template-columns: 1fr; grid-gap: 16px;">
          ###displaySections###
        </div>
      `,
    },
    {
      name: 'result.displaySections',
      loop: true,
      content: `
        <div>###id### Rate: ###rate### / ###maxRate###</div>
        <div style="padding-left: 32px; display: grid; grid-template-columns: 1fr; grid-gap: 16px"> ###status### </div>
        <div style="padding-left: 32px; display: grid; grid-template-columns: 1fr; grid-gap: 16px"> ###campaigns### </div>
      `,
    },
    {
      name: 'result.displaySections.campaigns',
      loop: true,
      content: `
        <div style="display: flex; align-items: center">
          <img
            style="width 50px; height: 50px; margin-right: 8px;"
            src="###icon###"
          />
          <div>###id###</div>
        </div>
      `,
    },
    {
      name: 'result.displaySections.status',
      loop: true,
      content: `
          <div>###type###</div>
          <div>###value###</div>
        `,
    },
    {
      name: 'result.displaySections.status.value',
      content: `
          <div>###$0###</div>
          <div>###$1###</div>
          <div>###$2###</div>
      `,
    },
  ]

  return htmlString.map((s) => {
    const template = document.createElement('template')
    template.innerHTML = s.content
    template.setAttribute('data-template', s.name)
    template.setAttribute('data-loop', s.loop === true ? 'true' : 'false')
    return template
  })
}

export function output(): HTMLTemplateElement {
  const html = `
    <div style="margin-bottom: 16px; font-weight: bold;">Updated: ###lastUpdateDate###</div>
    <div>###result###</div>
  `

  const template = document.createElement('template')
  template.innerHTML = html

  template.setAttribute('data-output', 'true')

  return template
}


export function xssOutput(): HTMLTemplateElement {
  const html = `
    <div>###result###</div>
  `

  const template = document.createElement('template')
  template.innerHTML = html

  template.setAttribute('data-output', 'true')
  template.setAttribute('data-sanitize-all', 'true')

  return template
}

export function xssTemplates(): HTMLTemplateElement[] {
  const htmlString = [
    {
      name: 'result',
      loop: false,
      content: `
          <div>###foo###</div>
          <div>###far###</div>
          <div>###faz###</div>
          <div>###nested###</div>
      `,
    },
    {
      name: 'result.nested',
      loop: true,
      content: `
        <div>###boo###</div>
        <div>###bar###</div>
        <div>###baz###</div>
      `,
    },
    {
      name: 'result.goo',
      loop: false,
      content: `
        <div>###$0###</div>
        <div>###$1###</div>
        <div>###$2###</div>
      `,
    },
  ]

  return htmlString.map((s) => {
    const template = document.createElement('template')
    template.innerHTML = s.content
    template.setAttribute('data-template', s.name)
    template.setAttribute('data-loop', s.loop === true ? 'true' : 'false')
    template.setAttribute('data-sanitize-all', 'true')

    return template
  })
}

export function points() {
  return {
    result: {
      rate: 1,
      maxRate: 20,
      displaySections: [
        {
          id: 'spuBasePoint',
          rate: 1,
          maxRate: 16,
          icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spux/r_spu.png',
          campaigns: [
            {
              id: 'spuStandard_v16_1',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_normal.png',
            },
            {
              id: 'spuMobile_v26',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_mobile_v2.png',
            },
            {
              id: 'spuMobileBilling_v20',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_mobile_carrier_billing.png',
            },
            {
              id: 'spuHikari_v19',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_hikari.png',
            },
            {
              id: 'rakutenCard_v22_1',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_card.png',
            },
            {
              id: 'spuCard_v22_1',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_card.png',
            },
            {
              id: 'spuPremiumCard_v22_1',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_card_premium.png',
            },
            {
              id: 'spuBank_v24_1',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_bank.png',
            },
            {
              id: 'spuSecuritiesIt_v24',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_securities.png',
            },
            {
              id: 'spuSecuritiesUs_v24',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_securities_us.png',
            },
            {
              id: 'spuWallet_v25',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_wallet_red.png',
            },
            {
              id: 'spuTravel_v23',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_travel.png',
            },
            {
              id: 'spuApp_v23',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_app.png',
            },
            {
              id: 'spuBooks_v26',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_books.png',
            },
            {
              id: 'spuKobo_v26',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_kobo.png',
            },
            {
              id: 'spuPasha_v23',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_pasha.png',
            },
            {
              id: 'spuRba_v23',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_rba_app.png',
            },
            {
              id: 'spuBeauty_v23',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/service_beauty.png',
            },
          ],
        },
        {
          id: 'bonusPoint',
          rate: 0,
          maxRate: 4,
          campaigns: [
            {
              id: 'kaimawari',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/campaign_shop-hopping.png',
            },
            {
              id: 'sport_v2',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/campaign_sports.png',
            },
            {
              id: 'shopx',
              icon: 'https://r.r10s.jp/com/inc/home/20080930/ris/img/spu_icon/campaign_shop.png',
            },
          ],
          status: [
            {
              type: 'COUNTER',
              value: ['3'],
            },
            {
              type: 'COUNTER_TOTAL',
              value: ['3'],
            },
            {
              type: 'SHOP_LIST',
              value: ['286702', '502941', '505347'],
            },
          ],
        },
      ],
    },
    lastUpdateDate: '2025/01/01',
  }
}
