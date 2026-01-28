// @ts-nocheck
import soloTemplateHtml from './solo_template.html?raw'
import integrationTemplateHtml from './integration_template.html?raw'
import { fillSoloTemplate, fillIntegrationTemplate, addGrid, addDummyData, indentSolo } from '../'

const dummyData = {
  '#TEXT1L1#': 'キャンペーンタイトル２０文字ここにはいり',
  '#SHOPURL1#': '#',
  '#IMAGESRC1#': 'https://placehold.co/200x50?text=200x50',
  '#IMAGEALT1#': '',
  '#SHOP1#': 'ショップ名６７８９０ショップ名６',
  '#TEXT2L1#':
    '店舗紹介文８０文字ここにはいります。９０店舗紹介文６７８９０店舗紹介文６７８９０店舗紹介文６７８９０店舗紹介文６７８９０店舗紹介文６７８９０店舗紹介文６７８９０',
  '#IMAGESRC2#': 'https://placehold.co/720x480?text=3x2',
  '#IMAGEALT2#': '',
  '#TEXT3L1#': '商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０',
  '#TEXT4L1#': '999,999,999',
  '#TEXT4L2#': '円',
  '#TEXTURL3#': '#',
  '#IMAGESRC3#': 'https://placehold.co/720x480?text=3x2',
  '#IMAGEALT3#': '',
  '#TEXT5L1#': '商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０',
  '#TEXT6L1#': '999,999,999',
  '#TEXT6L2#': '円',
  '#TEXTURL5#': '#',
}

const SP1columnPC1column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 16,
  },
  md: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 24,
  },
}

const soloSP1columnPC1column = fillSoloTemplate(soloTemplateHtml, SP1columnPC1column)

const soloWithDummySP1columnPC1columnHtml = addDummyData(soloSP1columnPC1column, dummyData)

export const soloHtml = soloWithDummySP1columnPC1columnHtml

export const staticSP1columnPC1columnHtml = addGrid(soloWithDummySP1columnPC1columnHtml, SP1columnPC1column)

const integrationSP1columnPC1column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC1column)

export const integrationSP1columnPC1columnHtml = integrationSP1columnPC1column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP1columnPC1column)
)
