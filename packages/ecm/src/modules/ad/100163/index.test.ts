/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'

import {
  staticVerticalSP1columnPC2columnHtml,
  staticHorizontalSP1columnPC2columnHtml,
  integrationVerticalSP1columnPC2columnHtml,
  integrationHorizontalSP1columnPC2columnHtml,
} from './'

describe('Static 100163', () => {
  test('VerticalSP1columnPC2columnHtml', () => {
    expect(staticVerticalSP1columnPC2columnHtml).toMatchSnapshot()
  })
  test('HorizontalSP1columnPC2columnHtml', () => {
    expect(staticHorizontalSP1columnPC2columnHtml).toMatchSnapshot()
  })
})

describe('Integration 100163', () => {
  test('VerticalSP1columnPC2columnHtml', () => {
    expect(integrationVerticalSP1columnPC2columnHtml).toMatchSnapshot()
  })
  test('HorizontalSP1columnPC2columnHtml', () => {
    expect(integrationHorizontalSP1columnPC2columnHtml).toMatchSnapshot()
  })
})
