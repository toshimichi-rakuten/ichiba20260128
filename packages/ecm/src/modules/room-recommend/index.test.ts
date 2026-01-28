/**
 * @vitest-environment jsdom
 */

import { describe, beforeEach, it, expect } from 'vitest'
import { RoomRecommend, ECM_MODULE_NAME } from '.'
import defaultHtml from './default.html?raw'
import { query } from '../../_utils'
import { ECM_MODULE_NAME_ATTRIBUTE } from '../../core/constants'
import dummyData from './room.json'

function addMock() {
  const rr = query<HTMLElement>(document).getElementsByAttribute({
    [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
  })[0]

  const mockTemplate = `
    <template data-room-recommend-data-mock>
      ${JSON.stringify(dummyData)}
    </template>
  `

  rr.innerHTML = `
    ${mockTemplate}
    ${rr.innerHTML}
  `
}

describe('RoomRecommend', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHtml
  })

  it('should be initialized without error', () => {
    const element = query<HTMLElement>(document).getElementsByAttribute({
      [ECM_MODULE_NAME_ATTRIBUTE]: ECM_MODULE_NAME,
    })[0]

    expect(() => {
      new RoomRecommend(element)
      addMock()
    }).not.toThrowError()
  })
})
