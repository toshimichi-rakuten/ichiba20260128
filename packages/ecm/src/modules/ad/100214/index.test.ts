/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'
import { staticSP1columnPC1columnHtml, integrationSP1columnPC1columnHtml } from './'

describe('Static 1000348', () => {
  test('SP1columnPC1columnHtml', () => {
    expect(staticSP1columnPC1columnHtml).toMatchSnapshot()
  })
})

describe('Integration 1000348', () => {
  test('SP1columnPC1columnHtml', () => {
    expect(integrationSP1columnPC1columnHtml).toMatchSnapshot()
  })
})
