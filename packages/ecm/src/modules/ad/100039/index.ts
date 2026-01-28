// @ts-nocheck
import soloTemplateHtml from './solo_template.html?raw'
import integrationTemplateHtml from './integration_template.html?raw'
import { fillSoloTemplate, fillIntegrationTemplate, addGrid, addDummyData, indentSolo } from '../'

const dummyData = {
  '#TEXTURL1#': '',
  '#IMAGESRC1#': 'https://placehold.co/720x480?text=3x2',
  '#IMAGEALT1#': '',
  '#TEXT1L1#': '商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０',
  '#TEXT2L1#': '9,999,999',
  '#TEXT2L2#': '円',
  '#ICONTXTCLASS1-1#': 'free_shipping',
  '#ICONTXT1-1#': '送料無料',
  '#ICONTXT2-1#': 'ポイント20倍',
  '#TEXTURL4#': '',
  '#ICONTXTCLASS3-1#': 'review_350',
  '#TEXT3L1#': '3.50',
  '#TEXT4L1#': '9,999件',
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
    gapY: 32,
  },
  otherClass: ['sm-ecm-ad-container-divided-y'],
}

export const SP1columnPC3column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 16,
  },
  md: {
    col: 3,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
  otherClass: ['sm-ecm-ad-container-divided-y'],
}

export const SP1columnPC4column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 16,
  },
  md: {
    col: 4,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
  otherClass: ['sm-ecm-ad-container-divided-y'],
}

const soloSP1columnPC2column = fillSoloTemplate(soloTemplateHtml, SP1columnPC2column)
const soloSP1columnPC3column = fillSoloTemplate(soloTemplateHtml, SP1columnPC3column)
const soloSP1columnPC4column = fillSoloTemplate(soloTemplateHtml, SP1columnPC4column)

const soloWithDummySP1columnPC2columnHtml = addDummyData(soloSP1columnPC2column, dummyData)
const soloWithDummySP1columnPC3columnHtml = addDummyData(soloSP1columnPC3column, dummyData)
const soloWithDummySP1columnPC4columnHtml = addDummyData(soloSP1columnPC4column, dummyData)

export const soloHtml = soloWithDummySP1columnPC2columnHtml

export const staticSP1columnPC2columnHtml = addGrid(soloWithDummySP1columnPC2columnHtml, SP1columnPC2column)
export const staticSP1columnPC3columnHtml = addGrid(soloWithDummySP1columnPC3columnHtml, SP1columnPC3column)
export const staticSP1columnPC4columnHtml = addGrid(soloWithDummySP1columnPC4columnHtml, SP1columnPC4column)

const integrationSP1columnPC2column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC2column)
const integrationSP1columnPC3column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC3column)
const integrationSP1columnPC4column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC4column)

export const integrationSP1columnPC2columnHtml = integrationSP1columnPC2column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP1columnPC2column)
)
export const integrationSP1columnPC3columnHtml = integrationSP1columnPC3column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP1columnPC3column)
)
export const integrationSP1columnPC4columnHtml = integrationSP1columnPC4column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP1columnPC4column)
)
