/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'
import {
  staticSP1columnPC2columnHtml,
  staticSP1columnPC3columnHtml,
  staticSP1columnPC4columnHtml,
  integrationSP1columnPC2columnHtml,
  integrationSP1columnPC3columnHtml,
  integrationSP1columnPC4columnHtml,
} from './'

describe('Static 100113', () => {
  test('SP1columnPC2column', () => {
    expect(staticSP1columnPC2columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC3column', () => {
    expect(staticSP1columnPC3columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC4column', () => {
    expect(staticSP1columnPC4columnHtml).toMatchSnapshot()
  })
})

describe('Integration 100113', () => {
  test('SP1columnPC2column', () => {
    expect(integrationSP1columnPC2columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC3column', () => {
    expect(integrationSP1columnPC3columnHtml).toMatchSnapshot()
  })
  test('SP1columnPC4column', () => {
    expect(integrationSP1columnPC4columnHtml).toMatchSnapshot()
  })
})
