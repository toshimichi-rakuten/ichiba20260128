/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'
import { staticSP1columnPC2columnHtml, integrationSP1columnPC2columnHtml } from './'

describe('Static 100061', () => {
  test('SP1columnPC2column', () => {
    expect(staticSP1columnPC2columnHtml).toMatchSnapshot()
  })
})

describe('Integration 100061', () => {
  test('SP1columnPC2column', () => {
    expect(integrationSP1columnPC2columnHtml).toMatchSnapshot()
  })
})
