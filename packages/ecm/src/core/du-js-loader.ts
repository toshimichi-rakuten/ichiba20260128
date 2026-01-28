/**
 * Original:
 * https://gitpub.rakuten-it.com/projects/IER/repos/module-file-builder/browse/src/modules/plug-in/DUJSHelper/src/DUJSHelper.js
 */

type JSType = {
  elementSelectorPC: string
  elementSelectorSP: string
  scriptSelectorPC: string
  scriptSelectorSP: string
  scriptSrcPC: string
  scriptSrcSP: string
  scriptCharsetPC: string
  scriptCharsetSP: string
}

type InsertScriptType = {
  scriptSrcPC: string
  scriptSrcSP: string
  scriptCharsetPC: string
  scriptCharsetSP: string
}

const DUJS: JSType[] = [
  {
    elementSelectorPC: '.ecm-buyagain',
    elementSelectorSP: '.ecm-buyagain',
    scriptSelectorPC: 'script[src*="com/js/d/buy_again"]',
    scriptSelectorSP: 'script[src*="com/js/d/buy_again"]',
    scriptSrcPC: 'https://r.r10s.jp/com/js/d/buy_again/1.6/buy_again-1.6.1.min.js',
    scriptSrcSP: 'https://r.r10s.jp/com/js/d/buy_again/1.6/buy_again-1.6.1.min.js',
    scriptCharsetPC: 'UTF-8',
    scriptCharsetSP: 'UTF-8',
  },
  // https://confluence.rakuten-it.com/confluence/display/coupon/%5BKnowledge+sharing%5D+One+click+acquisition
  {
    elementSelectorPC: '.ecm-coupon',
    elementSelectorSP: '.ecm-coupon',
    scriptSelectorPC: 'script[src*="com/js/d/coupon/one_click_acquisition"]',
    scriptSelectorSP: 'script[src*="com/js/d/coupon/one_click_acquisition"]',
    scriptSrcPC: 'https://r.r10s.jp/com/js/d/coupon/one_click_acquisition/1.2/one_click_acquisition-1.2.0.min.js',
    scriptSrcSP: 'https://r.r10s.jp/com/js/d/coupon/one_click_acquisition/1.2/one_click_acquisition-1.2.0.min.js',
    scriptCharsetPC: 'UTF-8',
    scriptCharsetSP: 'UTF-8',
  },
  {
    elementSelectorPC: '.ecm-smart-coupon',
    elementSelectorSP: '.ecm-smart-coupon',
    scriptSelectorPC: 'script[src*="com/js/d/smart_coupon"]',
    scriptSelectorSP: 'script[src*="com/js/d/smart_coupon"]',
    scriptSrcPC: 'https://r.r10s.jp/com/js/d/smart_coupon/2.4/smart_coupon-2.4.0.min.js',
    scriptSrcSP: 'https://r.r10s.jp/com/js/d/smart_coupon/2.4/smart_coupon-2.4.0.min.js',
    scriptCharsetPC: 'UTF-8',
    scriptCharsetSP: 'UTF-8',
  },
  {
    elementSelectorPC: '.ecm-browsing-history',
    elementSelectorSP: '.ecm-browsing-history',
    scriptSelectorPC: 'script[src*="com/js/d/ashiato"]',
    scriptSelectorSP: 'script[src*="com/js/d/smart/ashiato"]',
    scriptSrcPC: 'https://r.r10s.jp/com/js/d/ashiato/2.5/ashiato-2.5.0.min.js',
    scriptSrcSP: 'https://r.r10s.jp/com/js/d/smart/ashiato/1.6/smt_ashiato-1.6.0.min.js',
    scriptCharsetPC: 'UTF-8',
    scriptCharsetSP: 'UTF-8',
  },
  {
    elementSelectorPC: '.ecm-bookmark',
    elementSelectorSP: '.ecm-bookmark',
    scriptSelectorPC: 'script[src*="com/js/d/bookmark"]',
    scriptSelectorSP: 'script[src*="com/js/d/smart/bookmark"]',
    scriptSrcPC: 'https://r.r10s.jp/com/js/d/bookmark/3.2/bookmark-3.2.0.min.js',
    scriptSrcSP: 'https://r.r10s.jp/com/js/d/smart/bookmark/1.4/smt_bookmark-1.4.0.min.js',
    scriptCharsetPC: 'UTF-8',
    scriptCharsetSP: 'UTF-8',
  },
  {
    elementSelectorPC: '.ecm-du-ranking',
    elementSelectorSP: '.ecm-du-ranking',
    scriptSelectorPC: 'script[src*="com/js/d/ranking"]',
    scriptSelectorSP: 'script[src*="com/js/d/ranking/smartphone"]',
    scriptSrcPC:
      'https://r.r10s.jp/evt/event/campaign/supersale/com_2019/_pc/js/ranking-liquid-1.5.1-multiple-v.min.js',
    scriptSrcSP: 'https://r.r10s.jp/com/js/d/ranking/smartphone/1.5/ranking-1.5.1.min.js',
    scriptCharsetPC: 'UTF-8',
    scriptCharsetSP: 'UTF-8',
  },
]

function insertScript(
  { scriptSrcPC, scriptSrcSP, scriptCharsetPC, scriptCharsetSP }: InsertScriptType,
  onLoad: (script: HTMLScriptElement) => void
) {
  const isSP = isMobileDevice()
  const script = document.createElement('script')
  script.charset = isSP ? scriptCharsetSP : scriptCharsetPC
  script.type = 'text/javascript'
  script.src = isSP ? scriptSrcSP : scriptSrcPC
  script.defer = true

  try {
    document.body.insertAdjacentElement('beforeend', script)
    onLoad(script)
  } catch (e) {
    throw new Error(e as string)
  }
}

// We have width=1024 meta for PC html and it's the surest way to determine if the page is SP or PC
// because event server have some kind of logic that determines which html (index or sp_index) to return to the user base on their device.
export function isMobileDevice(): boolean {
  const viewportMeta = document.querySelector('meta[name="viewport"]')

  // Fallback if we don't find the meta
  if (!viewportMeta) {
    return !!navigator.userAgent.match(/iPhone|iPod|Android.+Mobile/)
  }

  const viewportMetaContent = viewportMeta.getAttribute('content')
  return viewportMetaContent === 'width=1024' ? false : true
}

function shouldLoad({ elementSelectorPC, elementSelectorSP, scriptSelectorPC, scriptSelectorSP }: JSType): boolean {
  const isSP = isMobileDevice()
  const elementSelector = isSP ? elementSelectorSP : elementSelectorPC
  const scriptSelector = isSP ? scriptSelectorSP : scriptSelectorPC

  const script = document.querySelector(scriptSelector)
  if (script) {
    return false
  }

  const parts = document.querySelector(elementSelector)

  return !!parts
}

export function DUJSLoader(onLoad: (script: HTMLScriptElement) => void) {
  const scripts = DUJS.filter(shouldLoad)

  for (let script of scripts) {
    insertScript(script, onLoad)
  }
}
