import { query } from '../../_utils'
import { ECM } from '../../core'
import { isMobileDevice } from '../../core/du-js-loader'
import { Slider } from '../slider'

export const ECM_MODULE_NAME = 'ecm-room-recommend'

type RAT = {
  accountId: number,
  options: string[]
  pData: {
    sid: string,
    evn: string,
    rpl: string,
    rcollectid: string[],
    rpp: number[],
  },
  pgn?: string
  pgt?: string
  gid?: string
}

type RoomItem = {
  cp: {
    collectid: string
  }
  cntLikes: string
  collectUrl: string
  ichibaItemImg: string
  itemCode: string
  itemId: string
  itemName: string
  itemPrice: string
  itemUrl: string
  roomItemImg: string
  roomUserUrl: string
  shopCode: string
  shopId: string
  shopName: string
  userComment: string
  userImg: string
  userName: string
}

type RecommendDataJson = {
  hit: number
  items: RoomItem[]
}

// TODO: Loading/Error state
export class RoomRecommend {
  root: HTMLElement
  itemTemplate: HTMLTemplateElement
  outputTemplate: HTMLTemplateElement
  jsonUrl: string
  mockData: RecommendDataJson
  ecm?: ECM
  visibleSlidesCount: number = 0
  trackedPages: Map<number, boolean> = new Map()

  constructor(root: HTMLElement, ecm?: ECM) {
    this.ecm = ecm
    this.root = root

    const outputTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-room-recommend-output')[0]

    if (!outputTemplate) {
      throw new Error(`[RoomRecommend] Output Template not found.`)
    }

    this.outputTemplate = outputTemplate

    const itemTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute(
      'data-room-recommend-item-template'
    )[0]

    if (!itemTemplate) {
      throw new Error(`[RoomRecommend] Item Template not found.`)
    }

    this.itemTemplate = itemTemplate

    const mockTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute(
      'data-room-recommend-data-mock'
    )[0]

    if (mockTemplate) {
      const data = JSON.parse(mockTemplate.innerHTML)
      this.renderItems(data.items)
    } else {
      const jsonUrl = this.root.getAttribute('data-json-url')

      if (!jsonUrl) {
        throw new Error(`[RoomRecommend] data-json is required.`)
      }

      this.jsonUrl = jsonUrl

      try {
        this.getItems()
      } catch (e) {
        console.error(e)
      }
    }
  }

  private getItems() {
    const fetchItems = async () => {
      const res = await fetch(this.jsonUrl)

      if (!res.ok) {
        throw new Error('[RoomRecommend] fetching items failed.')
      }

      const { hits: _hits, items } = await res.json()
      this.renderItems(items)
    }

    fetchItems()
  }

  private renderItems(items: RoomItem[]) {
    this.root.innerHTML = this.outputTemplate.innerHTML + this.root.innerHTML

    const renderedItems = items
      .map((item) => {
        let html = this.itemTemplate.innerHTML

        for (const [key, value] of Object.entries(item)) {
          if (typeof value === 'object') {
            continue
          }
          html = html.replaceAll(`###${key}###`, value)
        }

        return html
      })
      .join('')

    const container = query<HTMLElement>(this.root).getElementsByAttribute('data-room-recommend-item-container')[0]

    container.innerHTML = renderedItems

    if (this.ecm) {
      this.ecm.init({
        root: this.root,
        mount: false,
      })
    }

    if (isMobileDevice()) {
      return
    }

    // Add RAT tracking. PC Only.
    const slider = query<HTMLElement>(this.root).getElementsByAttribute({
      'data-module-name': 'ecm-slider'
    })[0]

    if (!slider) {
      console.warn('[ECM] room-recommend slider not found. Cannot add RAT.')
      return
    }

    // old RoomRecommend RAT event spec: https://git.rakuten-it.com/projects/JP_MALL_GROUP_NAVIGATION/repos/ichiba-javascript/browse/JavaScript/room_recommended_items_list/room_recommended_items_list.js
    // 1. It sends RAT event on page load (page 1 of the slider)
    // 2. It sends RAT event when slider page changes
    // 3. It only sends RAT event once per slider page
    // 4. `window.resize` is not handled

    const onSlideChange = (startIndex: number) => {
      const collectIds = items.map(i => i.cp.collectid)
      const endIndex = Math.min((startIndex + this.visibleSlidesCount) - 1, items.length)
      const alreadySent = this.trackedPages.get(startIndex)

      if (!alreadySent) {
        this.sendRAT(collectIds, [
          startIndex, endIndex
        ])
        this.trackedPages.set(startIndex, true)
      }
    }

    // Send the first page on page load.
    onSlideChange(0)

    const links = query<HTMLAnchorElement>(this.root).getElementsByClassName('ecm-room-recommend-item-link')

    // Start tracking when the slides becomes visible on the viewport.
    const obs = new IntersectionObserver((entries) => {
      this.visibleSlidesCount = entries.filter(e => e.isIntersecting).length
      const maxPage = Math.ceil(items.length / this.visibleSlidesCount)
      for (let i = 1; i <= maxPage; i++) {
        this.trackedPages.set(i, false)
      }

      slider.dispatchEvent(new CustomEvent('ecmSliderGetInstance', {
        detail: {
          callback: (slider: Slider) => {
            const { swiper } = slider
            swiper.on('slideChange', () => {
              onSlideChange(swiper.realIndex)
            })
          }
        }
      }))

      // The goal of the observer is to only add callback to slideChange event, 
      // so we can remove it after that.
      for (let link of links) {
        obs.unobserve(link)
      }
    })

    for (let link of links) {
      obs.observe(link)
    }
  }

  // Example RAT events:
  // {"acc":470,"aid":43,"pgn":"/area/antennashop/","sid":"ROOM","evn":"reco","rpl":"00-00-005-001","rcollectid":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"rpp":[6,12],"url":"https://event.rakuten.co.jp/area/antennashop/?l-id=event_top_pc_second_food_area_antennashop","ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0","etype":"async","pgid":"f1e2b8dd2b596691","cks":"00001","_ra":"1736905389545|4f0daea1-0d7e-418c-ac3b-75e58e3bc4cf","use_cks":true,"cks2":"00001","ckp":"A8khX7LJA6ycDQyplYfToCHwK7ykZY0XFg2iC-06Y4ZTN2jIdn4ifL7wCViFn31ki_mADOHGgjDkLzR8h7W6fLlEcdSHEQ2MMgEc1NGFSIvqhhhYN_QOleONSzNNtqQw8qLegYtEh4IPovsSf5hKarTeJi8L55skzQn7lvFl_rptRVcXvjE_cTI~","Rg":"1155c7&ab614e6e294e9bb041b6dd5fdf65c4b4de57acbb03dcd8c55690d20d5c840f70d46b16ef4f367d9dab88ae251c59e45bcf0da5844ca1a47e69594e70ef9105c2b17ee3a02b6a8b8b81e8655748a677cdde57acbb03dcd8c55690d20d5c840f70924e7ebaec3148a3b72d32e1f27a5468963dc8b7be71ae8c08ada303da1cc8695a61e078d0b788ea835dadec5e555117&2025-05-21+16:14:11"}
  // {"acc":470,"aid":43,"pgn":"/area/antennashop/","sid":"ROOM","evn":"reco","rpl":"00-00-005-001","rcollectid":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"rpp":[12,18],"url":"https://event.rakuten.co.jp/area/antennashop/?l-id=event_top_pc_second_food_area_antennashop","ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0","etype":"async","pgid":"f1e2b8dd2b596691","cks":"00001","_ra":"1736905389545|4f0daea1-0d7e-418c-ac3b-75e58e3bc4cf","use_cks":true,"cks2":"00001","ckp":"A8khX7LJA6ycDQyplYfToCHwK7ykZY0XFg2iC-06Y4ZTN2jIdn4ifL7wCViFn31ki_mADOHGgjDkLzR8h7W6fLlEcdSHEQ2MMgEc1NGFSIvqhhhYN_QOleONSzNNtqQw8qLegYtEh4IPovsSf5hKarTeJi8L55skzQn7lvFl_rptRVcXvjE_cTI~","Rg":"1155c7&ab614e6e294e9bb041b6dd5fdf65c4b4de57acbb03dcd8c55690d20d5c840f70d46b16ef4f367d9dab88ae251c59e45bcf0da5844ca1a47e69594e70ef9105c2b17ee3a02b6a8b8b81e8655748a677cdde57acbb03dcd8c55690d20d5c840f70924e7ebaec3148a3b72d32e1f27a5468963dc8b7be71ae8c08ada303da1cc8695a61e078d0b788ea835dadec5e555117&2025-05-21+16:14:11"}
  // {"acc":470,"aid":43,"pgn":"/area/antennashop/","sid":"ROOM","evn":"reco","rpl":"00-00-005-001","rcollectid":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"rpp":[18,20],"url":"https://event.rakuten.co.jp/area/antennashop/?l-id=event_top_pc_second_food_area_antennashop","ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0","etype":"async","pgid":"f1e2b8dd2b596691","cks":"00001","_ra":"1736905389545|4f0daea1-0d7e-418c-ac3b-75e58e3bc4cf","use_cks":true,"cks2":"00001","ckp":"A8khX7LJA6ycDQyplYfToCHwK7ykZY0XFg2iC-06Y4ZTN2jIdn4ifL7wCViFn31ki_mADOHGgjDkLzR8h7W6fLlEcdSHEQ2MMgEc1NGFSIvqhhhYN_QOleONSzNNtqQw8qLegYtEh4IPovsSf5hKarTeJi8L55skzQn7lvFl_rptRVcXvjE_cTI~","Rg":"1155c7&ab614e6e294e9bb041b6dd5fdf65c4b4de57acbb03dcd8c55690d20d5c840f70d46b16ef4f367d9dab88ae251c59e45bcf0da5844ca1a47e69594e70ef9105c2b17ee3a02b6a8b8b81e8655748a677cdde57acbb03dcd8c55690d20d5c840f70924e7ebaec3148a3b72d32e1f27a5468963dc8b7be71ae8c08ada303da1cc8695a61e078d0b788ea835dadec5e555117&2025-05-21+16:14:11"}
  private sendRAT(collectIds: string[], rpp: number[]) {
    const addCustomEvent = import.meta.env.MODE === 'development'
      ? console.log
      // @ts-ignore
      : window?.RAT?.addCustomEvent 

    if (typeof addCustomEvent != "function") {
      throw new Error('[ECM] [RoomRecommend] window.RAT.addCustomEvent is not a function')
    }

    const apiSettings = this.getApiSettings()
    const globalSettings = this.getGlobalSettings()

    const base: RAT = {
      accountId: 470,
      options: ['url', 'ua'],
      pData: {
        sid: 'ROOM',
        evn: 'reco',
        rpl: '00-00-005-001',
        rcollectid: collectIds,
        rpp: rpp,
      },
    }

    if (globalSettings && globalSettings.ratPageName) {
      base.pgn = globalSettings.ratPageName
    }

    if (globalSettings && globalSettings.ratPageType) {
      base.pgt = globalSettings.ratPageType
    }

    if (apiSettings.genreId) {
      base.gid = apiSettings.genreId
    }

    addCustomEvent(base)
  }

  // https://git.rakuten-it.com/projects/JP_MALL_GROUP_NAVIGATION/repos/ichiba-javascript/browse/JavaScript/R/R.util.js#1439
  private getApiSettings(): { genreId: string | null } {
    const el = document.querySelector('.api-settings')

    if (!el) {
      return {
        genreId: null
      }
    }

    return {
      genreId: el.getAttribute('data-genre-id')
    }
  }

  private getGlobalSettings(): { ratPageName: string | null, ratPageType: string | null } {
    const el = document.querySelector('.global-settings')

    if (!el) {
      return {
        ratPageName: null,
        ratPageType: null
      }
    }

    return {
      ratPageName: el.getAttribute('data-rat-page-name'),
      ratPageType: el.getAttribute('data-rat-page-type')
    }
  }
}

