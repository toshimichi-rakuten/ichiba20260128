import ExcelJS from 'exceljs'

type Module = {
  selector?: string
  className?: string
  mark: boolean
  moduleName: string
  message: string
  newModuleName: string
  reference_url: string
  color: string
}

const oldModules: Module[] = [
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-itemAlcor',
    moduleName: 'アルコル用テンプレート',
    message: '移行',
    newModuleName: 'アルコル (通常）',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ad/alcor-normal/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'ri-searchAlcor',
    moduleName: 'サーチアルコル用テンプレート',
    message: '移行',
    newModuleName: 'サーチアルコル',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ad/alcor-search/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-itemRankingAlcor',
    moduleName: 'ランキングアルコル用テンプレート',
    message: '移行',
    newModuleName: 'アルコル（ランキング）',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ad/alcor-ranking/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-itemCPA',
    moduleName: 'CPA用テンプレート',
    message: '移行',
    newModuleName: 'CPA',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ad/cpa/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-campaignRules',
    moduleName: 'キャンペーン詳細・ルール',
    message: '移行',
    newModuleName: 'キャンペーン詳細・ルール',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/campaign/campaign-details/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-rewardHeader',
    moduleName: 'キャンペーン共通アイコン・記載必須文言',
    message: '移行',
    newModuleName: 'キャンペーン共通アイコン・記載必須文言',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/campaign/reward-header/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-noTransitionCoupon',
    moduleName: '非遷移クーポン獲得ボタン',
    message: '移行',
    newModuleName: '非遷移クーポン獲得ボタン',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/campaign/coupon/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-couponShopList',
    moduleName: 'クーポン対象ショップリスト',
    message: '移行',
    newModuleName: 'クーポン対象ショップリスト',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/campaign/coupon-shop-list/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-kanban',
    moduleName: '看板',
    message: '移行',
    newModuleName: '看板',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/kanban/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-headline',
    moduleName: '見出し',
    message: '移行',
    newModuleName: '見出し',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/commentary-headline/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rn-floatingNavi',
    moduleName: 'フローティング・ナビ',
    message: '移行',
    newModuleName: 'フローティング・ナビ（ヘッダー）',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/floating-navi/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rn-floatingRightNavi',
    moduleName: 'フローティング・アンカーナビ',
    message: '移行',
    newModuleName: 'フローティング・ナビ（右）',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/floating-menu/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rb-floatingRightBanner',
    moduleName: 'フローティングライトバナー',
    message: '移行',
    newModuleName: 'フローティング・バナー（右トグル）',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/floating-toggle/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rb-floatingBottomBanner',
    moduleName: 'フローティングボトムバナー',
    message: '移行',
    newModuleName: 'フローティング・バナー（ボトム）',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/floating-banner/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rn-floatingToggleNavi',
    moduleName: 'ハンバーガーメニュー',
    message: '移行',
    newModuleName: 'ハンバーガーメニュー',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/floating-toggle-navi/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-contentsIntroLink',
    moduleName: '下層ページ一覧',
    message: '移行',
    newModuleName: '下層ページ一覧',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/commentary/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rb-banner',
    moduleName: 'バナーエリア',
    message: '移行',
    newModuleName: 'バナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/banner/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rl-itemCarousel',
    moduleName: 'カルーセル',
    message: '移行',
    newModuleName: 'スライダー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/slider/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rl-slider',
    moduleName: 'カルーセル',
    message: '移行',
    newModuleName: 'スライダー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/slider/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rn-tab',
    moduleName: 'タブ切り替え表示',
    message: '移行',
    newModuleName: 'タブ',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/tab/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rn-modal',
    moduleName: 'モーダル',
    message: '移行',
    newModuleName: 'モーダル',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/modal/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-searchForm',
    moduleName: '検索フォーム',
    message: '移行',
    newModuleName: '検索',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/search/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-button',
    moduleName: '汎用ボタン',
    message: '移行',
    newModuleName: 'テキストボタン',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/button/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-searchKeyword',
    moduleName: '検索キーワードリスト',
    message: '移行',
    newModuleName: 'ピル型リンク',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/pill/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    selector: '[class*="ra-l-"]',
    moduleName: 'サービスロゴ・ラベル',
    message: '移行',
    newModuleName: 'サービス・SNSアイコン',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/icon/brand-icon/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rp-showMore',
    moduleName: 'もっと見る',
    message: '移行',
    newModuleName: 'もっと見る',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/js/view-more/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rp-smoothScroll',
    moduleName: 'スムーズスクロール',
    message: '移行',
    newModuleName: 'スムーズスクロール',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/js/smooth-scroll/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'js-auto-parameter',
    moduleName: 'オートパラメーター',
    message: 'セレクタ変更 (class="js-auto-parameter" -> data-module-name="ecm-auto-parameter")',
    newModuleName: 'オートパラメーター',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/js/auto-parameter/',
  },
  {
    mark: true,
    color: 'rebeccapurple',
    className: 'rc-entryButton',
    moduleName: 'エントリーボタン',
    message: '変更なし',
    newModuleName: '-',
    reference_url:
      'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/campaign/entry-button/',
  },
  // {
  //   mark: false,
  //   color: 'gray',
  //   className: '-',
  //   moduleName: 'レイジーローディング',
  //   message: '変更なし',
  //   newModuleName: '-',
  //   reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/js/lazy-loading/',
  // },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'ra-rewardIcon',
    moduleName: '対象サービスアイコン',
    message: '移行',
    newModuleName: 'ラベル',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/badge/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    selector: '[class*="ra-i-"]',
    moduleName: '汎用アイコン',
    message: '移行',
    newModuleName: 'ジャンル アイコン',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/icon/genre-icon/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    selector: '[class*="rex-icon"]',
    moduleName: 'Rexアイコン',
    message: '移行',
    newModuleName: 'UI アイコン (ReX)',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/icon/ui-icon/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    selector: '[class*="ra-ui-"]',
    moduleName: 'UIアイコン',
    message: '移行',
    newModuleName: 'UI アイコン (ReX)',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/icon/ui-icon/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    selector: '[class*="ru-"]',
    moduleName: 'CSSスタイル一覧',
    message: '移行',
    newModuleName: 'CSSスタイル一覧',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/css/list/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-column',
    moduleName: 'カラムレイアウト',
    message: '移行',
    newModuleName: 'グリッドレイアウト',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/css/grid/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-moduleWrap',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-moduleWrap--sp',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-moduleWrap--pc',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-2columnWrap',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-2columnWrap--leftNavi',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-2columnWrap__mainColumn',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-width960',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rc-breadcrumb',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'パンくずリスト',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/breadcrumb/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'riWrap',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'riGlobalWrap',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'コンテナー',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/container/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'riBreadcrumbs',
    moduleName: 'アウトライン',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'パンくずリスト',
    reference_url: 'https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ui/breadcrumb/',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-headerWrap',
    moduleName: '共通ヘッダー',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'なし',
    reference_url: '',
  },
  {
    mark: false,
    color: 'rebeccapurple',
    className: 'rl-footerWrap',
    moduleName: '共通フッター',
    message: '新しいアウトラインファイルを利用してください',
    newModuleName: 'なし',
    reference_url: '',
  },
]

// const LABEL_COLORS = [
//   'rgba(222, 8, 118, 0.8)',
//   'rgba(20, 24, 235, 0.8)',
//   'rgba(17, 116, 96, 0.8)',
//   'rgba(44, 106, 12, 0.8)',
//   'rgba(83, 30, 12, 0.8)',
// ]

// function getRandomColor() {
//   return LABEL_COLORS[Math.floor(Math.random() * LABEL_COLORS.length)]
// }

function main() {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Migrate')

  let sheetIndex = 0

  sheet.addRow(['旧モジュール', '', '新モジュール'])
  sheetIndex++

  sheet.addRow(['Target ID', 'class名', 'モジュール名', 'メッセージ', 'モジュール名', 'リファレンスURL'])
  sheetIndex++

  for (let char of ['A', 'B', 'C', 'D', 'E', 'F']) {
    sheet.getCell(`${char}1`).font = {
      size: 14,
      bold: true,
    }

    sheet.getCell(`${char}2`).font = {
      size: 14,
      bold: true,
    }
  }

  let labelsRect: [DOMRect, HTMLElement][] = []

  // @ts-ignore
  const radTables = [...document.getElementsByClassName('rad-table-existItemDisplay')] as HTMLElement[]

  for (let [index, table] of radTables.entries()) {
    const tag = table.previousSibling?.previousSibling

    let marker = `0-${index + 1} 原稿タイプ`
    let url = 'http://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ad-finder/'

    let row = [marker, 'rad-table-existItemDisplay', marker, '移行。IDの習得が出来ませんでした。', marker, url]

    if (tag && tag.nodeType == 8) {
      try {
        const adId = (tag as Comment).nodeValue?.split(':')[1].split('--')[0]

        if (adId) {
          marker = `0-${index + 1} 原稿タイプID${adId}`
          url = `http://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/ecm/docs/ad/${adId}/`

          row = [marker, 'rad-table-existItemDisplay', marker, '移行', marker, url]
        }
      } catch (e) {
        console.log('[CheckTool] no RAD.')
      }
    }

    sheet.addRow(row)
    sheetIndex++

    for (let char of ['A', 'B', 'C', 'D', 'E', 'F']) {
      sheet.getCell(`${char}${sheetIndex}`).font = {
        size: 14,
      }
    }

    const color = 'rebeccapurple'
    const targetMarked = table.getAttribute('data-ct-marked')

    if (targetMarked !== 'true') {
      table.style.outline = `3px solid ${color}`
      table.style.position = `relative`
      table.setAttribute('data-ct-marked', 'true')
    }

    const label = createLabel(marker, url, color, 10 * index)

    const closeLabel = createCloseLabel()

    closeLabel.addEventListener('click', (e) => {
      e.stopPropagation()
      table.style.outline = 'unset'
      label.remove()
    })

    label.appendChild(closeLabel)
    table.appendChild(label)

    const rect = label.getBoundingClientRect()
    labelsRect.push([rect, label])
  }

  for (let i = 0; i < oldModules.length; i++) {
    const old = oldModules[i]

    const nodes = old.selector
      ? document.querySelectorAll(old.selector)
      : old.className
        ? document.getElementsByClassName(old.className)
        : []

    for (let j = 0; j < nodes.length; j++) {
      const targetNode = nodes[j] as HTMLElement
      // @ts-ignore
      const marker = old.mark ? `${i + 1}-${j + 1}` : `"${[...targetNode.classList].join(' ')}"`

      sheet.addRow([
        marker,
        old.className ?? old.selector,
        old.moduleName,
        old.message,
        old.newModuleName,
        old.reference_url,
      ])
      sheetIndex++

      for (let char of ['A', 'B', 'C', 'D', 'E', 'F']) {
        sheet.getCell(`${char}${sheetIndex}`).font = {
          size: 14,
        }
      }

      if (!old.mark) {
        continue
      }

      const color = old.color
      const targetMarked = targetNode.getAttribute('data-ct-marked')

      if (targetMarked !== 'true') {
        targetNode.style.outline = `3px solid ${color}`
        targetNode.style.position = `relative`
        targetNode.setAttribute('data-ct-marked', 'true')
      }

      const label = createLabel(`${marker} ${old.moduleName}`, old.reference_url, color, 10 * i + j)

      const closeLabel = createCloseLabel()

      closeLabel.addEventListener('click', (e) => {
        e.stopPropagation()
        targetNode.style.outline = 'unset'
        label.remove()
      })

      label.appendChild(closeLabel)
      targetNode.appendChild(label)

      const rect = label.getBoundingClientRect()
      labelsRect.push([rect, label])
    }
  }

  for (let lr of labelsRect) {
    const overlapping = labelsRect.find((entry) => {
      const [rect1, el1] = lr
      const [rect2, el2] = entry

      if (el1.isSameNode(el2)) {
        return false
      }

      return isOverlapping(rect1, rect2)
    })

    if (!overlapping) {
      continue
    }

    const [_, el] = overlapping

    el.style.transform = el.style.transform.replace(/translateY\(([^)]+)\)/, (_match, capture) => {
      const px = Number(capture.replace('px', ''))
      return `translateY(${px + 24}px)`
    })

    overlapping[0] = el.getBoundingClientRect()
  }

  sheet.columns[0].width = 10
  sheet.columns[1].width = 25
  sheet.columns[2].width = 30
  sheet.columns[3].width = 30
  sheet.columns[4].width = 30
  sheet.columns[5].width = 120

  const overlay = document.createElement('div')
  overlay.style.position = 'relative'

  const button = createDownloadButton()

  button.addEventListener('click', () => {
    downloadExcel(workbook)
  })

  overlay.appendChild(button)

  document.body.prepend(overlay)

  const footer = document.getElementsByClassName('rl-footerWrap')[0]
  const footerLabels = footer.querySelectorAll('[ct-label]')
  const footerAutoParameters = footer.getElementsByClassName('js-auto-parameter')

  // @ts-ignore
  for (let el of [...footerLabels]) {
    el.remove()
  }

  // @ts-ignore
  for (let el of [...footerAutoParameters]) {
    // @ts-ignore
    el.style.outline = 'unset'
  }
}

function isOverlapping(rect1: DOMRect, rect2: DOMRect) {
  return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)
}

function createCloseLabel() {
  const closeLabel = document.createElement('button')
  closeLabel.textContent = 'x'
  closeLabel.style.padding = '4px'
  closeLabel.style.width = '20px'
  closeLabel.style.background = 'none'
  closeLabel.style.border = 'none'
  closeLabel.style.marginLeft = '4px'
  closeLabel.style.color = 'white'
  closeLabel.style.cursor = 'pointer'

  return closeLabel
}

function createDownloadButton() {
  const button = document.createElement('button')
  button.style.bottom = '64px'
  button.style.left = '64px'
  button.style.position = 'fixed'
  button.style.zIndex = '32767'
  button.style.padding = '12px 16px'
  button.style.backgroundColor = 'red'
  button.style.fontSize = '18px'
  button.style.color = 'white'
  button.style.borderRadius = '4px'
  button.style.border = 'none'
  button.style.display = 'flex'
  button.style.justifyContent = 'center'
  button.style.alignItems = 'center'
  button.style.fontWeight = 'bold'
  button.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)'
  button.textContent = '【チェックツール結果】Excelダウンロード'

  return button
}

function createLabel(content: string, href: string, color: string, z: number) {
  const anchor = document.createElement('a')
  anchor.textContent = content
  anchor.style.color = 'white'
  anchor.setAttribute('href', href)
  anchor.setAttribute('target', '_blank')
  anchor.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  const label = document.createElement('div')
  label.style.color = 'white'
  label.style.backgroundColor = color
  label.style.padding = '2px 4px'
  label.style.fontSize = '13px'
  label.style.fontWeight = 'bold'
  label.style.position = 'absolute'
  label.style.zIndex = `${32767 + z}`
  label.style.cursor = 'pointer'
  label.style.opacity = '0.8'
  label.style.height = '24px'
  label.style.display = 'flex'
  label.style.alignItems = 'center'
  label.style.justifyContent = 'center'
  label.style.whiteSpace = 'nowrap'
  label.style.top = '100%'
  label.style.left = '50%'
  label.style.transform = 'translateX(-50%) translateY(0)'
  label.setAttribute('ct-label', 'true')

  label.appendChild(anchor)

  return label
}

async function downloadExcel(workbook: ExcelJS.Workbook) {
  const cannon = document.querySelector('[rel="canonical"]')
  const href = cannon?.getAttribute('href') || ''

  const pageName = cannon
    ? href.replaceAll('https://event.rakuten.co.jp', '').replaceAll('/', '_').replace(/_+$/, '')
    : 'page'

  const buffer = await workbook.xlsx.writeBuffer()

  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${Date.now()}${pageName}.xlsx`
  anchor.click()
  window.URL.revokeObjectURL(url)
}

//@ts-ignore
if (window?._console?.enableConsole && typeof window?._console?.enableConsole === 'function') {
  //@ts-ignore
  window._console.enableConsole()
}
main()
