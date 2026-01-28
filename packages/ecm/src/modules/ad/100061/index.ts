// @ts-nocheck
import soloTemplateHtml from './solo_template.html?raw'
import integrationTemplateHtml from './integration_template.html?raw'
import { fillSoloTemplate, fillIntegrationTemplate, addGrid, addDummyData, indentSolo } from '../'

const dummyData = {
  '#TEXTURL1#': '#',
  '#IMAGESRC1#': 'https://placehold.co/720x405?text=16x9',
  '#IMAGEALT1#': '',
  '#TEXT1L1#': 'キャッチ５６７８９０キャッチ５６７８９０キャッチ５６７８',
  '#TEXT2L1#':
    '商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０',
  '#TEXT3L1#':
    '補足文４５６７８９０補足文４５６７８９０補足文４５６７８９０補足文４５６７８９０補足文４５６７８９０補足文４５６７８９０補足文４５６７８９０',
  '#TEXT4L1#': '999,999,999',
  '#TEXT4L2#': '円',
}

const SP1columnPC2column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 28,
  },
  md: {
    col: 2,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
}

SP1columnPC2column

const soloSP1columnPC2column = fillSoloTemplate(soloTemplateHtml, SP1columnPC2column)

const soloWithDummySP1columnPC2columnHtml = addDummyData(soloSP1columnPC2column, dummyData)

export const soloHtml = soloWithDummySP1columnPC2columnHtml

export const staticSP1columnPC2columnHtml = addGrid(soloWithDummySP1columnPC2columnHtml, SP1columnPC2column)

const integrationSP1columnPC2column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC2column)

export const integrationSP1columnPC2columnHtml = integrationSP1columnPC2column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP1columnPC2column)
)
