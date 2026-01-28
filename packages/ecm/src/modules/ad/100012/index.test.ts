/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'
import {
  staticSP1columnPC2columnHtml,
  staticSP1columnPC3columnHtml,
  staticSP1columnPC4columnHtml,
  staticSP2columnPC2columnHtml,
  staticSP2columnPC3columnHtml,
  staticSP2columnPC4columnHtml,
  integrationSP1columnPC2columnHtml,
  integrationSP1columnPC3columnHtml,
  integrationSP1columnPC4columnHtml,
  integrationSP2columnPC2columnHtml,
  integrationSP2columnPC3columnHtml,
  integrationSP2columnPC4columnHtml,
} from './'

describe('Static 100012', () => {
  test('SP1columnPC2columnHtml', () => {
    expect(staticSP1columnPC2columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC3columnHtml', () => {
    expect(staticSP1columnPC3columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC4columnHtml', () => {
    expect(staticSP1columnPC4columnHtml).toMatchSnapshot()
  })
  test('SP2columnPC2columnHtml', () => {
    expect(staticSP2columnPC2columnHtml).toMatchSnapshot()
  })
  test('SP2columnPC3columnHtml', () => {
    expect(staticSP2columnPC3columnHtml).toMatchSnapshot()
  })
  test('SP2columnPC4columnHtml', () => {
    expect(staticSP2columnPC4columnHtml).toMatchSnapshot()
  })
})

describe('Integration 100012', () => {
  test('SP1columnPC2columnHtml', () => {
    expect(integrationSP1columnPC2columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC3columnHtml', () => {
    expect(integrationSP1columnPC3columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC4columnHtml', () => {
    expect(integrationSP1columnPC4columnHtml).toMatchSnapshot()
  })
  test('SP2columnPC2columnHtml', () => {
    expect(integrationSP2columnPC2columnHtml).toMatchSnapshot()
  })
  test('SP2columnPC3columnHtml', () => {
    expect(integrationSP2columnPC3columnHtml).toMatchSnapshot()
  })
  test('SP2columnPC4columnHtml', () => {
    expect(integrationSP2columnPC4columnHtml).toMatchSnapshot()
  })
})
