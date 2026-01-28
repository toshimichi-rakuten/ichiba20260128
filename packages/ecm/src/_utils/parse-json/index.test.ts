import { expect, describe, it } from 'vitest'
import { parseObject, parseArray } from '.'

describe('parse-json', () => {
  it('should parse json object', async () => {
    const object = { test: '123' }
    const string = JSON.stringify(object)

    expect(parseObject(string)).toMatchObject(object)
  })

  it('should parse json array', async () => {
    const arr = [{ test: '123' }]
    const string = JSON.stringify(arr)

    expect(parseArray(string)).toMatchObject(arr)
  })
})
