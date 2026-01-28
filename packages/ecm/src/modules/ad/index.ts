export type gridLayout = {
  sp: {
    col: number
    gap: number | null
    gapX: number | null
    gapY: number | null
  }
  md: {
    col: number
    gap: number | null
    gapX: number | null
    gapY: number | null
  }
  otherClass?: string[]
}

export function createGridClass(grid: gridLayout) {
  const createGapClass = (breakpoint: 'sp' | 'md', gap: number | null, gapX: number | null, gapY: number | null) => {
    if (!gap && !gapX && !gapY) {
      return ''
    }

    const prefix = breakpoint === 'sp' ? '' : `${breakpoint}-`

    if (gap) {
      return `${prefix}d-grid-gap-${gap}`
    }

    return [gapX ? `${prefix}d-grid-gap-x-${gapX}` : '', gapY ? `${prefix}d-grid-gap-y-${gapY}` : '']
      .filter(Boolean)
      .join(' ')
  }

  const setOtherClass = (otherClass: string[] | undefined) => {
    if (typeof otherClass === 'undefined') {
      return ''
    }

    return otherClass.join(' ')
  }

  const className = [
    'd-grid',
    `d-grid-col-${grid.sp.col}`,
    `${grid.sp.col === grid.md.col ? '' : 'md-d-grid-col-' + grid.md.col}`,
    createGapClass('sp', grid.sp.gap, grid.sp.gapX, grid.sp.gapY),
    createGapClass('md', grid.md.gap, grid.md.gapX, grid.md.gapY),
    setOtherClass(grid.otherClass),
  ]
    .filter(Boolean)
    .join(' ')

  return className
}

export function indentSolo(text: string) {
  return (
    text
      .split(/\r?\n/)
      // add 4 space
      .map((s) => `    ${s.trimEnd()}`)
      .join('\n')
      .trim()
  )
}

export function fillIntegrationTemplate(template: string, grid: gridLayout) {
  const spColumn = grid.sp.col
  const mdColumn = grid.md.col
  const gridClass = createGridClass(grid)

  return template
    .replaceAll('%RAD_TABLE_BODY%', `rad-table-body ${gridClass}`)
    .replaceAll('%GRID_LAYOUT%', `SPx${spColumn}PCx${mdColumn}`)
}

export function fillSoloTemplate(template: string, grid: gridLayout) {
  const spColumn = grid.sp.col

  const replaced = template

  // Increase price text sizes and margin-top on column1
  if (spColumn == 1) {
    return replaced
      .replaceAll('%ECM_AD_BODY%', 'ecm-ad-body mt-12')
      .replaceAll('%ECM_AD_COPY%', 'ecm-ad-copy')
      .replaceAll('%ECM_AD_NAME%', 'ecm-ad-name text-sm')
      .replaceAll('%ECM_AD_PRICE_AMOUNT%', 'ecm-ad-price-amount text-2xl')
      .replaceAll('%ECM_AD_PRICE_UNIT%', 'ecm-ad-price-unit text-sm')
      .replaceAll('%ECM_AD_PRICE_FREE_SHIPPING%', 'ecm-ad-price-free-shipping text-sm')
  }

  return replaced
    .replaceAll('%ECM_AD_BODY%', 'ecm-ad-body mt-8 md-mt-12')
    .replaceAll('%ECM_AD_COPY%', 'ecm-ad-copy text-sm md-text-base')
    .replaceAll('%ECM_AD_NAME%', 'ecm-ad-name')
    .replaceAll('%ECM_AD_PRICE_AMOUNT%', 'ecm-ad-price-amount')
    .replaceAll('%ECM_AD_PRICE_UNIT%', 'ecm-ad-price-unit')
    .replaceAll('%ECM_AD_PRICE_FREE_SHIPPING%', 'ecm-ad-price-free-shipping')
}

export function addGrid(template: string, grid: gridLayout) {
  const gridClass = createGridClass(grid)

  const items = [...Array(grid.md.col).keys()].map(() => template).join('')

  const content = `
    <div
      class="${gridClass}"
    >
      ${items}
    </div>
  `

  return content
}

export function addDummyData(template: string, data: object) {
  let appliedTemplate = template

  for (let [key, value] of Object.entries(data)) {
    appliedTemplate = appliedTemplate.replaceAll(key, value)
  }

  return appliedTemplate
}
