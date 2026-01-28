// @ts-nocheck
import soloVerticalTemplateHtml from './solo_sp_vertical_template.html?raw'
import soloHorizontalTemplateHtml from './solo_sp_horizontal_template.html?raw'

import integrationVerticalTemplateHtml from './integration_sp_vertical_template.html?raw'
import integrationHorizontalTemplateHtml from './integration_sp_horizontal_template.html?raw'

import { fillSoloTemplate, fillIntegrationTemplate, addGrid, addDummyData, indentSolo } from '..'

const dummyData = {
  '#TEXTURL1#': '',
  '#IMAGEURL1#': '',
  '#IMAGESRC1#': 'https://placehold.co/480x120?text=4x1',
  '#IMAGEALT1#': '',
  '#IMAGESRC2#': 'https://placehold.co/720x480?text=3x2',
  '#IMAGEALT2#': '',
  '#TEXT1L1#': '商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０',
  '#TEXT2L1#': '999,999,999',
  '#TEXT2L2#': '円',
  '#ICONTXTCLASS1-1#': 'free_shipping',
  '#ICONTXT1-1#': '送料無料',
  '#ICONTXTCLASS2-1#': '',
  '#ICONTXT2-1#': 'ポイント20倍',
}

export const SP1columnPC2column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 16,
  },
  md: {
    col: 2,
    gap: null,
    gapX: 24,
    gapY: 48,
  },
}

const soloVerticalSP1columnPC2column = fillSoloTemplate(soloVerticalTemplateHtml, SP1columnPC2column)

const soloVerticalWithDummySP1columnPC2columnHtml = addDummyData(soloVerticalSP1columnPC2column, dummyData)

export const soloVerticalHtml = soloVerticalWithDummySP1columnPC2columnHtml

export const staticVerticalSP1columnPC2columnHtml = addGrid(
  soloVerticalWithDummySP1columnPC2columnHtml,
  SP1columnPC2column
)

const integrationVerticalSP1columnPC2column = fillIntegrationTemplate(
  integrationVerticalTemplateHtml,
  SP1columnPC2column
)

export const integrationVerticalSP1columnPC2columnHtml = integrationVerticalSP1columnPC2column.replaceAll(
  '%SOLO%',
  indentSolo(soloVerticalSP1columnPC2column)
)

const soloHorizontalSP1columnPC2column = fillSoloTemplate(soloHorizontalTemplateHtml, SP1columnPC2column)

const soloHorizontalWithDummySP1columnPC2columnHtml = addDummyData(soloHorizontalSP1columnPC2column, dummyData)

export const soloHorizontalHtml = soloHorizontalWithDummySP1columnPC2columnHtml

export const staticHorizontalSP1columnPC2columnHtml = addGrid(
  soloHorizontalWithDummySP1columnPC2columnHtml,
  SP1columnPC2column
)

const integrationHorizontalSP1columnPC2column = fillIntegrationTemplate(
  integrationHorizontalTemplateHtml,
  SP1columnPC2column
)

export const integrationHorizontalSP1columnPC2columnHtml = integrationHorizontalSP1columnPC2column.replaceAll(
  '%SOLO%',
  indentSolo(soloHorizontalSP1columnPC2column)
)
