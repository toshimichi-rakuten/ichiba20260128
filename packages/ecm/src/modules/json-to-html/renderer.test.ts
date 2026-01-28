/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { Renderer } from './renderer'
import { points, templates, output } from './test_utils'

describe('Renderer', () => {
  const testTemplates = templates()
  const renderer = new Renderer(testTemplates, 'escape')

  it('should render', () => {
    const data = points()
    const outputTemplate = output()

    expect(renderer.render(outputTemplate, data, '')).toMatchSnapshot()
  })
})
