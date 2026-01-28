// @ts-nocheck
import soloTemplateHtml from './solo_template.html?raw'
import integrationTemplateHtml from './integration_template.html?raw'
import { fillSoloTemplate, fillIntegrationTemplate, addGrid, addDummyData, indentSolo } from '../'

const dummyData = {
  '#TEXTURL1#': '#',
  '#IMAGESRC1#': 'https://placehold.co/720x480?text=3x2',
  '#IMAGEALT1#': '',
  '#TEXT1L1#': '商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０商品名４５６７８９０',
  '#TEXT2L1#': '999,999,999',
  '#TEXT2L2#': '円',
  '#ICONTXTCLASS1-1#': 'free_shipping',
  '#ICONTXT1-1#': '送料無料',
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
const SP1columnPC3column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 28,
  },
  md: {
    col: 3,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
}
const SP1columnPC4column = {
  sp: {
    col: 1,
    gap: null,
    gapX: null,
    gapY: 28,
  },
  md: {
    col: 4,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
}
const SP2columnPC2column = {
  sp: {
    col: 2,
    gap: null,
    gapX: 12,
    gapY: 28,
  },
  md: {
    col: 2,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
}
const SP2columnPC3column = {
  sp: {
    col: 2,
    gap: null,
    gapX: 12,
    gapY: 28,
  },
  md: {
    col: 3,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
}
const SP2columnPC4column = {
  sp: {
    col: 2,
    gap: null,
    gapX: 12,
    gapY: 28,
  },
  md: {
    col: 4,
    gap: null,
    gapX: 24,
    gapY: 32,
  },
}

const soloSP1columnPC2column = fillSoloTemplate(soloTemplateHtml, SP1columnPC2column)
const soloSP1columnPC3column = fillSoloTemplate(soloTemplateHtml, SP1columnPC3column)
const soloSP1columnPC4column = fillSoloTemplate(soloTemplateHtml, SP1columnPC4column)
const soloSP2columnPC2column = fillSoloTemplate(soloTemplateHtml, SP2columnPC2column)
const soloSP2columnPC3column = fillSoloTemplate(soloTemplateHtml, SP2columnPC3column)
const soloSP2columnPC4column = fillSoloTemplate(soloTemplateHtml, SP2columnPC4column)

const soloWithDummySP1columnPC2column = addDummyData(soloSP1columnPC2column, dummyData)
const soloWithDummySP1columnPC3column = addDummyData(soloSP1columnPC3column, dummyData)
const soloWithDummySP1columnPC4column = addDummyData(soloSP1columnPC4column, dummyData)
const soloWithDummySP2columnPC2column = addDummyData(soloSP2columnPC2column, dummyData)
const soloWithDummySP2columnPC3column = addDummyData(soloSP2columnPC3column, dummyData)
const soloWithDummySP2columnPC4column = addDummyData(soloSP2columnPC4column, dummyData)

export const soloHtml = soloWithDummySP1columnPC2column

export const staticSP1columnPC2columnHtml = addGrid(soloWithDummySP1columnPC2column, SP1columnPC2column)
export const staticSP1columnPC3columnHtml = addGrid(soloWithDummySP1columnPC3column, SP1columnPC3column)
export const staticSP1columnPC4columnHtml = addGrid(soloWithDummySP1columnPC4column, SP1columnPC4column)
export const staticSP2columnPC2columnHtml = addGrid(soloWithDummySP2columnPC2column, SP2columnPC2column)
export const staticSP2columnPC3columnHtml = addGrid(soloWithDummySP2columnPC3column, SP2columnPC3column)
export const staticSP2columnPC4columnHtml = addGrid(soloWithDummySP2columnPC4column, SP2columnPC4column)

const integrationSP1columnPC2column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC2column)
const integrationSP1columnPC3column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC3column)
const integrationSP1columnPC4column = fillIntegrationTemplate(integrationTemplateHtml, SP1columnPC4column)
const integrationSP2columnPC2column = fillIntegrationTemplate(integrationTemplateHtml, SP2columnPC2column)
const integrationSP2columnPC3column = fillIntegrationTemplate(integrationTemplateHtml, SP2columnPC3column)
const integrationSP2columnPC4column = fillIntegrationTemplate(integrationTemplateHtml, SP2columnPC4column)

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

export const integrationSP2columnPC2columnHtml = integrationSP2columnPC2column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP2columnPC2column)
)

export const integrationSP2columnPC3columnHtml = integrationSP2columnPC3column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP2columnPC3column)
)

export const integrationSP2columnPC4columnHtml = integrationSP2columnPC4column.replaceAll(
  '%SOLO%',
  indentSolo(soloSP2columnPC4column)
)
