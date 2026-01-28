import styles from './index.module.scss'
import { previews } from './previews'
import type { Preview } from './previews'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { addBasePath } from 'src/utils'

const Frame = dynamic(() => import('./frame'), {
  ssr: false,
})

type Filter = {
  group: string
  name: string
  key: string
  label: string
}

const partialFilters = [
  { group: 'category', name: 'item', label: '商品' },
  { group: 'category', name: 'shop', label: 'ショップ紹介' },
  { group: 'category', name: 'ranking', label: 'ランキング形式' },
  { group: 'category', name: 'coupon', label: 'クーポン' },
  { group: 'category', name: 'kanban', label: '看板' },
  { group: 'category', name: 'banner', label: 'バナー' },
  { group: 'category', name: 'vertical', label: '縦長商品画像' },
  { group: 'category', name: 'brand', label: 'ブランドロゴ' },
  { group: 'category', name: 'slider', label: 'スライダー' },
  { group: 'category', name: 'tie_up', label: 'タイアップ広告' },
  { group: 'image', name: '1x1', label: '正方形（1：1）' },
  { group: 'image', name: '3x2', label: '横長（3：21、16：9、3：1など）' },
  { group: 'image', name: '3x4', label: '縦長（3：4、3：1など）' },
  { group: 'image', name: 'others', label: 'その他' },
  { group: 'brand', name: '1x1', label: '正方形（1：1）' },
  { group: 'brand', name: '3x1', label: '横長（3：1または4：1など）' },
  { group: 'text', name: 'item_name', label: '商品名' },
  { group: 'text', name: 'item_desc', label: '商品説明文' },
  { group: 'text', name: 'catchcopy', label: 'キャッチコピー' },
  { group: 'text', name: 'shop_name', label: '店舗名' },
  { group: 'text', name: 'brand_name', label: 'ブランド名' },
  { group: 'text', name: 'coupon', label: 'クーポン獲得URL' },
  { group: 'text', name: 'others', label: 'その他テキスト' },
  { group: 'text', name: 'inventory', label: '販売実績チェック/在庫数など' },
  { group: 'price', name: 'value', label: '販売価格' },
  { group: 'price', name: 'original_value', label: '元値' },
  { group: 'price', name: 'discount', label: 'OFF率・OFF額・割引率' },
  { group: 'icon', name: 'free_delivery', label: '送料無料' },
  { group: 'icon', name: 'point_multiplier', label: 'ポイント変倍' },
  { group: 'icon', name: 'discount', label: '半額・割引系' },
  { group: 'icon', name: 'gift', label: 'ギフト系' },
  { group: 'icon', name: 'delivery', label: '配送系' },
  { group: 'icon', name: 'review', label: 'レビュー系' },
  { group: 'icon', name: 'coupon', label: 'クーポン関連' },
  { group: 'icon', name: 'fashion', label: 'ファッションカテゴリー' },
  { group: 'layout', name: 'sp_list', label: 'SPリスト' },
  { group: 'layout', name: 'sp_col1', label: 'SP1カラム' },
  { group: 'layout', name: 'sp_col2', label: 'SP2カラム' },
  { group: 'layout', name: 'sp_col3', label: 'SP3カラム' },
  { group: 'layout', name: 'pc_col1', label: 'PC1カラム' },
  { group: 'layout', name: 'pc_col2', label: 'PC2カラム' },
  { group: 'layout', name: 'pc_col3', label: 'PC3カラム' },
  { group: 'layout', name: 'pc_col4', label: 'PC4カラム' },
  { group: 'layout', name: 'pc_col5', label: 'PC5カラム' },
  { group: 'layout', name: 'sp_only', label: 'SPのみ' },
  { group: 'layout', name: 'pc_only', label: 'PCのみ' },
  { group: 'layout', name: 'pc_sp', label: 'PC/SP共通可' },
  { group: 'layout', name: 'others', label: 'その他' },
]

const filters: Filter[] = partialFilters.map((f) => {
  return {
    ...f,
    key: `${f.group}_${f.name}`,
  }
})

const categoryFilters = filters.filter((f) => f.group == 'category')

const imageFilters = filters.filter((f) => f.group == 'image')

const brandFilters = filters.filter((f) => f.group == 'brand')

const textFilters = filters.filter((f) => f.group == 'text')

const priceFilters = filters.filter((f) => f.group == 'price')

const iconFilters = filters.filter((f) => f.group == 'icon')

const layoutFilters = filters.filter((f) => f.group == 'layout')

export function ADFinder() {
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])

  const activeFilterKeys = activeFilters.map((a) => a.key)

  const visiblePreviews =
    activeFilterKeys.length == 0
      ? previews
      : previews.filter((p) => {
          const checkedTags = p.meta.finder_tags.filter((t) => {
            return activeFilterKeys.includes(t)
          })

          if (!checkedTags.length) {
            return false
          }

          // convert tags to filters
          const checkedFilters = checkedTags.map((t) => filters.find((f) => f.key == t)) as Filter[]
          const checkFilterKeys = checkedFilters.map((c) => c.key)

          return activeFilterKeys.every((key) => checkFilterKeys.includes(key))
        })

  const checkMultiple = (filters: Filter[]) => {
    const allChecked = filters.every((item) => {
      return activeFilterKeys.includes(item.key)
    })

    if (allChecked) {
      const newFilters = activeFilters.filter((a) => {
        return !filters.some((f) => f.key == a.key)
      })

      setActiveFilters(newFilters)
    } else {
      const uncheckedFilters = filters.filter((f) => !activeFilterKeys.includes(f.key))
      setActiveFilters([...activeFilters, ...uncheckedFilters])
    }
  }

  const toggle = (filter: Filter) => {
    const isChecked = activeFilterKeys.includes(filter.key)

    if (isChecked) {
      const newFilters = activeFilters.filter((a) => a.key != filter.key)
      setActiveFilters(newFilters)
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const setGroup = (filter: Filter, group: Filter[]) => {
    const isChecked = activeFilterKeys.includes(filter.key)

    if (isChecked) {
      const newFilters = activeFilters.filter((a) => a.key != filter.key)
      setActiveFilters(newFilters)
    } else {
      const groupKeys = group.map((g) => g.key)
      const newFilters = activeFilters.filter((a) => !groupKeys.includes(a.key))
      setActiveFilters([...newFilters, filter])
    }
  }

  const isChecked = (filter: Filter) => {
    return activeFilterKeys.includes(filter.key)
  }

  const checkAllLabel = (filters: Filter[]) => {
    const allChecked = filters.every((item) => activeFilters.includes(item))
    return allChecked ? 'リセット' : 'すべて選択'
  }

  return (
    <div>
      <div className={styles['title-wrapper']}>
        <h2
          id='絞り込み検索'
          className={styles['h2']}
        >
          絞り込み検索
        </h2>
        <button
          onClick={() => setActiveFilters([])}
          className={styles['reset']}
        >
          <ResetIcon />
          <span>すべてリセット</span>
        </button>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>カテゴリ</span>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {categoryFilters.map((c) => (
              <Checkbox
                radio={true}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => setGroup(c, categoryFilters)}
              />
            ))}
          </div>
        </div>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>商品画像</span>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {imageFilters.map((c) => (
              <Checkbox
                radio={true}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => setGroup(c, imageFilters)}
              />
            ))}
          </div>
        </div>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>ブランドロゴ・ショップ画像</span>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {brandFilters.map((c) => (
              <Checkbox
                radio={true}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => setGroup(c, brandFilters)}
              />
            ))}
          </div>
        </div>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>テキスト・URL類</span>
            <button
              className={styles['category-reset']}
              onClick={() => checkMultiple(textFilters)}
            >
              {checkAllLabel(textFilters)}
            </button>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {textFilters.map((c) => (
              <Checkbox
                radio={false}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => toggle(c)}
              />
            ))}
          </div>
        </div>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>価格</span>
            <button
              className={styles['category-reset']}
              onClick={() => checkMultiple(priceFilters)}
            >
              {checkAllLabel(priceFilters)}
            </button>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {priceFilters.map((c) => (
              <Checkbox
                radio={false}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => toggle(c)}
              />
            ))}
          </div>
        </div>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>アイコン（選択項目）類</span>
            <button
              className={styles['category-reset']}
              onClick={() => checkMultiple(iconFilters)}
            >
              {checkAllLabel(iconFilters)}
            </button>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {iconFilters.map((c) => (
              <Checkbox
                radio={false}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => toggle(c)}
              />
            ))}
          </div>
        </div>
        <div className={styles['category-row']}>
          <div className={styles['category']}>
            <span className={styles['category-name']}>レイアウト類</span>
            <button
              className={styles['category-reset']}
              onClick={() => checkMultiple(layoutFilters)}
            >
              {checkAllLabel(layoutFilters)}
            </button>
          </div>
          <div className={styles['checkbox-wrapper']}>
            {layoutFilters.map((c) => (
              <Checkbox
                radio={false}
                checked={isChecked(c)}
                key={c.name}
                group={c.group}
                name={c.name}
                label={c.label}
                onChange={() => toggle(c)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '16px',
        }}
      >
        検索結果 {`${visiblePreviews.length} / ${previews.length}`} 件
      </div>

      {visiblePreviews.length == 0 ? <Empty /> : <Frame content={createPreviews(activeFilters, visiblePreviews)} />}
    </div>
  )
}

function createPreviews(activeFilters: Filter[], previews: Preview[]) {
  const items = previews
    .map((prev) => {
      const { meta, demo } = prev

      const demoHtml = demo
        .map((d: string, i: number) => {
          return `
        <div style="margin-top: ${i == 0 ? '0px;' : '32px;'}">${d}</div>
      `
        })
        .join('')

      const renderTag = (key: string) => {
        const filter = filters.find((f) => f.key == key)

        if (!filter) {
          return key
        }

        if (filter.group == 'image' && filter.name == '1x1') {
          return '正方形'
        }

        if (filter.group == 'image' && filter.name == '3x2') {
          return '横長'
        }

        if (filter.group == 'image' && filter.name == '3x4') {
          return '縦長'
        }

        if (filter.group == 'brand' && filter.name == '1x1') {
          return '正方形'
        }

        if (filter.group == 'brand' && filter.name == '3x1') {
          return '横長'
        }

        return filter.label
      }

      const getTagBgColor = (key: string) => {
        const active = activeFilters.find((f) => f.key == key)

        if (active) {
          return '#00a0f0'
        }

        return '#fafafa'
      }

      const getTagColor = (key: string) => {
        const active = activeFilters.find((f) => f.key == key)

        if (active) {
          return '#fafafa'
        }

        return '#717171'
      }

      const renderTitle = () => {
        if (meta.subtitle) {
          return `
            <div style="display: flex; flex-direction: column;">
              <div style="font-size: 16px; font-weight: bold;">${meta.title}</div>
              <div style="font-size: 16px; font-weight: bold;">${meta.subtitle}</div>
              <a style="margin-left: auto; color: #333; margin-top: 12px;" target="_top" href="${addBasePath(meta.url)}">
                  仕様を見る
                  <svg style="margin-left: 4px;" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.707 0.5L0 1.207L5.793 7L0 12.793L0.707 13.5L7.207 7L0.707 0.5Z" fill="#333333" />
                  </svg>
              </a>
            </div>
      `
        }

        return `
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 16px; font-weight: bold;">${meta.title}</div>
              <a style="color: #333; margin-left: 8px;" target="_top" href="${addBasePath(meta.url)}">
                  仕様を見る
                  <svg style="margin-left: 4px;" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.707 0.5L0 1.207L5.793 7L0 12.793L0.707 13.5L7.207 7L0.707 0.5Z" fill="#333333" />
                  </svg>
              </a>
            </div>
      `
      }

      const width = prev.meta.finder_tags.includes('layout_pc_only') ? '100%' : '375px'
      const colSize = prev.meta.finder_tags.includes('layout_pc_only') ? 'span 3' : 'span 1'

      return `
      <div style="
        border: 1px solid #D1D1D1; grid-column: ${colSize};
      ">
        <div style="
          padding-top: 12px;
          padding-bottom: 12px;
          padding-left: 16px;
          padding-right: 16px;
          background-color: #F7F7F7;
          border-bottom: 1px solid #D1D1D1;
        ">
            ${renderTitle()}
        </div>
            <div style="
              display: flex;
              flex-wrap: wrap;
              gap: 4px;
              padding: 8px; 
              padding-top: 16px;
              background-color: #717171;
            ">
            ${meta.finder_tags
              .map(
                (t) =>
                  `<span style="
              padding: 4px;
              background-color: ${getTagBgColor(t)};
              color: ${getTagColor(t)};
              font-weight: bold;
              font-size: 12px;
            ">${renderTag(t)}</span>`
              )
              .join('')}
          </div>
          <div style="display: flex; justify-content: center; background-color: #717171; padding: 16px;">
            <div style="padding: 16px; width: ${width}; background-color: white;">
              ${demoHtml}
            </div>
          </div>
        </div>
    `
    })
    .join('')

  return `<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; grid-auto-flow: row dense;">
  ${items}
</div>
`
}

function Empty() {
  return (
    <div className={styles['not-found']}>
      <span>検索結果が見つかりませんでした</span>
      <span>検索内容を変更の上、再度お試しください</span>
    </div>
  )
}

function Checkbox({
  checked,
  name,
  label,
  onChange,
  group,
  radio,
}: {
  checked: boolean
  name: string
  group: string
  label: string
  onChange: Function
  radio: boolean
}) {
  return (
    <div className={styles['checkbox']}>
      <div className={radio ? styles['input-wrapper-radio'] : styles['input-wrapper-checkbox']}>
        <input
          checked={checked}
          id={`${group}-${name}`}
          type='checkbox'
          onChange={(e) => onChange(name, e.target.checked)}
        />
        <CheckIcon />
      </div>
      <label htmlFor={`${group}-${name}`}>{label}</label>
    </div>
  )
}

function ResetIcon() {
  return (
    <svg
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.6875 9.5C15.6875 12.9116 12.9116 15.6875 9.5 15.6875C6.08844 15.6875 3.3125 12.9116 3.3125 9.5C3.3125 6.08844 6.08844 3.3125 9.5 3.3125C11.2393 3.3125 12.8609 4.03475 14.0309 5.29813L12.6421 6.6875H16.25V3.07963L14.8269 4.50275C13.4465 3.02844 11.5413 2.1875 9.5 2.1875C5.468 2.1875 2.1875 5.468 2.1875 9.5C2.1875 13.532 5.468 16.8125 9.5 16.8125C13.532 16.8125 16.8125 13.532 16.8125 9.5H15.6875Z'
        fill='currentColor'
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width='13'
      height='10'
      viewBox='0 0 13 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.75 1.38289L11.8663 0.5L4.625 7.73359L1.13375 4.24636L0.25 5.12925L4.625 9.5L12.75 1.38289Z'
        fill='white'
      />
    </svg>
  )
}
