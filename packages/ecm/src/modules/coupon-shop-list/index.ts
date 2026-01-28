import { query, shuffleArray } from '../../_utils'
import { ECM } from '../../core'

export const ECM_MODULE_NAME = 'ecm-coupon-shop-list'

// https://r.r10s.jp/com/js/c/ecm/inc/json/coupon_genre_20210715.json
// https://r.r10s.jp/evt/event/_jstest/ecm/couponshoplist/YYYYMMDD/shoplist_sample_01.json
// https://r.r10s.jp/evt/event/_jstest/ecm/couponshoplist/YYYYMMDD/shoplist_sample_02.json
// https://r.r10s.jp/evt/event/_jstest/ecm/couponshoplist/YYYYMMDD/shoplist_sample_03.json
//
type Genre = {
  genre_id: number
  genre_name: string
}

type Coupon = {
  shop_id: string
  shop_url: string
  shop_name: string
  shop_name_kana: string
  genre_name: string
  genre_id: string
  subgenre_name: string
  subgenre_id: string
}

type SortType = 'asc' | 'desc'

export class CouponShopList {
  root: HTMLElement
  outputTemplate: HTMLTemplateElement
  itemTemplate: HTMLTemplateElement
  dataTemplates: HTMLTemplateElement[]
  groupTemplate?: HTMLTemplateElement
  genres: Genre[]
  couponsMap: Map<string, Coupon[]>
  ecm?: ECM

  constructor(root: HTMLElement, ecm?: ECM) {
    this.ecm = ecm
    this.root = root

    this.outputTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute(
      'data-coupon-shop-list-output'
    )[0]

    if (!this.outputTemplate) {
      throw new Error('[CouponShopList] data-coupon-shop-list-output not found.')
    }

    this.itemTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute(
      'data-coupon-shop-list-item-template'
    )[0]

    if (!this.itemTemplate) {
      throw new Error('[CouponShopList] data-coupon-shop-list-item-template not found.')
    }

    this.dataTemplates = query<HTMLTemplateElement>(this.root).getElementsByAttribute('data-coupon-shop-list-data')

    if (!this.dataTemplates.length) {
      throw new Error('[CouponShopList] data-coupon-shop-list-data not found.')
    }

    this.groupTemplate = query<HTMLTemplateElement>(this.root).getElementsByAttribute(
      'data-coupon-shop-list-group-template'
    )[0]

    this.couponsMap = new Map()

    Promise.all([this.fetchGenre(), ...this.dataTemplates.map((d) => this.fetchCoupon(d))])
      .then(() => {
        try {
          this.render()
        } catch (e) {
          console.error(e)
        }
      })
      .catch((e) => console.error(e))
  }

  private async fetchGenre() {
    const dataCouponGenre = this.root.getAttribute('data-coupon-genre')

    if (!dataCouponGenre) {
      throw new Error('[CouponShopList] data-coupon-genre is empty.')
    }

    const url =
      dataCouponGenre.startsWith('http') || dataCouponGenre.startsWith('/')
        ? dataCouponGenre
        : `https://r.r10s.jp/com/js/c/ecm/inc/json/coupon_genre_${dataCouponGenre}.json?v=${dataCouponGenre}`

    const res = await fetch(url)

    if (res.ok) {
      const { data } = await res.json()
      this.genres = data
    } else {
      throw new Error('[CouponShopList] Failed to fetch genre.')
    }
  }

  private async fetchCoupon(template: HTMLTemplateElement) {
    const url = template.getAttribute('data-coupons-json-url')
    // Empty string is valid Map key. We use it for anon data.
    const category = template.getAttribute('data-coupon-shop-list-data') || ''

    if (!url) {
      throw new Error('[CouponShopList] data-coupons-json-url is empty.')
    }

    const res = await fetch(url)

    if (res.ok) {
      const { data } = await res.json()
      this.couponsMap.set(category, data)
    } else {
      throw new Error(`[CouponShopList] Failed to fetch data-coupon-shop-list-data="${category}" coupon.`)
    }
  }

  private renderGroupedItems(coupons: Coupon[]) {
    const grouped = this.groupBy('genre_id')(coupons)
    const entries = Object.entries(grouped) as [string, Coupon[]][]

    // `this.groupBy` converts array of coupons into object which automatically sorts the keys. We sort it back to the original order.
    const sortedEntries = new Array()
    this.genres.forEach((item) => {
      const currentGroup = entries.find((g) => g[0] === item.genre_id.toString())!
      if (currentGroup) sortedEntries.push(currentGroup)
    })

    const renderedEntries = sortedEntries
      .map(([genreId, coupons], entryIndex) => {
        const currentGenre = this.genres.find((g) => g.genre_id.toString() == genreId)!
        const renderedItems = this.renderSimpleItems(coupons)

        return this.groupTemplate!.innerHTML.replaceAll(`###genre_group###`, currentGenre.genre_name)
          .replaceAll('###genre_group_index###', (entryIndex + 1).toString())
          .replaceAll('###items###', renderedItems)
      })
      .join('')

    return renderedEntries
  }

  private renderSimpleItems(coupons: Coupon[]) {
    return coupons.map((c) => this.renderCouponData(this.itemTemplate.innerHTML, c)).join('')
  }

  private render() {
    this.root.innerHTML = this.outputTemplate.innerHTML + this.root.innerHTML

    const containers = query<HTMLElement>(this.root).getElementsByAttribute('data-coupon-shop-list-item-container')

    if (!containers.length) {
      throw new Error('[CouponShopList] [data-coupon-shop-list-item-container] element not found.')
    }

    for (let container of containers) {
      const category = container.getAttribute('data-coupon-shop-list-item-container') || ''
      const coupons = this.couponsMap.get(category)

      if (!coupons?.length) {
        continue
      }

      // Remove 'Null' values
      let filtered = coupons.filter((c) => {
        if (!c.shop_id) {
          return false
        }

        if (c.shop_id.toString().toLowerCase() == 'null') {
          return false
        }

        if (c.genre_id.toString().toLowerCase() == 'null') {
          return false
        }

        return true
      })

      const filterBy = container.getAttribute('data-filter')

      if (filterBy) {
        filtered = filtered.filter((f) => f.genre_id == filterBy)
      }

      const sortBy = container.getAttribute('data-sort')
      const sortType = container.getAttribute('data-sort-type') as SortType | null

      if (sortBy) {
        filtered = filtered.sort((elA, elB) => {
          // @ts-ignore
          const a = elA[sortBy as string]
          // @ts-ignore
          const b = elB[sortBy as string]

          if (sortType === 'desc') {
            if (b > a) {
              return 1
            }
            return -1
          } else {
            if (a > b) {
              return 1
            }
            return -1
          }
        })
      } else {
        filtered = shuffleArray(filtered)
      }

      const renderedOutput = this.groupTemplate ? this.renderGroupedItems(filtered) : this.renderSimpleItems(filtered)
      container.innerHTML = renderedOutput
    }

    if (this.ecm) {
      this.ecm.init({
        root: this.root,
        mount: false,
      })
    }
  }

  private renderCouponData(template: string, coupon: Coupon) {
    const entries = Object.entries(coupon)

    for (let [key, value] of entries) {
      if (typeof value == 'string') {
        template = template.replaceAll(`###${key}###`, value)
      }
    }

    return template
  }

  private groupBy(key: string) {
    return (array: Coupon[]) =>
      array.reduce((objectsByKeyValue, obj) => {
        // @ts-ignore
        const value = obj[key]
        // @ts-ignore
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
        return objectsByKeyValue
      }, {})
  }
}
