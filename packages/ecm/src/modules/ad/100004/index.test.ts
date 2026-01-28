/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'
import {
  staticSP1columnPC2columnHtml,
  staticSP1columnPC4columnHtml,
  staticSP2columnPC2columnHtml,
  staticSP2columnPC3columnHtml,
  integrationSP1columnPC2columnHtml,
  integrationSP1columnPC4columnHtml,
  integrationSP2columnPC2columnHtml,
  integrationSP2columnPC3columnHtml,
} from './'

describe('Static 100004', () => {
  test('SP1-column PC-2column', () => {
    expect(staticSP1columnPC2columnHtml).toMatchSnapshot()
  })

  test('SP1-column PC-4column', () => {
    expect(staticSP1columnPC4columnHtml).toMatchSnapshot()
  })

  test('SP2-column PC2column', () => {
    expect(staticSP2columnPC2columnHtml).toMatchSnapshot()
  })

  test('SP2-column PC3column', () => {
    expect(staticSP2columnPC3columnHtml).toMatchSnapshot()
  })
})

describe('Integration 100004', () => {
  test('SP1-column PC-2column', () => {
    expect(integrationSP1columnPC2columnHtml).toMatchSnapshot()
  })

  test('SP1-column PC-4column', () => {
    expect(integrationSP1columnPC4columnHtml).toMatchSnapshot()
  })

  test('SP2-column PC2column', () => {
    expect(integrationSP2columnPC2columnHtml).toMatchSnapshot()
  })

  test('SP2-column PC3column', () => {
    expect(integrationSP2columnPC3columnHtml).toMatchSnapshot()
  })
})
