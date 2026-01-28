/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect } from 'vitest'
import { PersonalizedDisplay, FET_MODULE_NAME } from '.'
import html from './index.html?raw'

function getButton(type: string): HTMLButtonElement {
  return document.querySelector(`button[data-type="${type}"]`)! as HTMLButtonElement
}

describe('PersonalizedDisplay', () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  it('should initialize without error', () => {
    const root = document.querySelector(`[data-plugin-name="${FET_MODULE_NAME}"]`)! as HTMLElement
    expect(() => new PersonalizedDisplay(root)).not.toThrowError()
  })

  it('should display red view when Red is clicked', () => {
    const root = document.querySelector(`[data-plugin-name="${FET_MODULE_NAME}"]`)! as HTMLElement
    new PersonalizedDisplay(root)
    getButton('red').click()
    // wait for MutationObserver to trigger
    return Promise.resolve().then(() => {
      const view = document.querySelector('[data-personalized-display-view="colors"]')!
      expect(view.innerHTML).toContain('ff0000')
    })
  })

  it('should display blue view when Blue is clicked', () => {
    const root = document.querySelector(`[data-plugin-name="${FET_MODULE_NAME}"]`)! as HTMLElement
    new PersonalizedDisplay(root)
    getButton('blue').click()
    return Promise.resolve().then(() => {
      const view = document.querySelector('[data-personalized-display-view="colors"]')!
      expect(view.innerHTML).toContain('0000ff')
    })
  })

  it('should display green view when Green is clicked', () => {
    const root = document.querySelector(`[data-plugin-name="${FET_MODULE_NAME}"]`)! as HTMLElement
    new PersonalizedDisplay(root)
    getButton('green').click()
    return Promise.resolve().then(() => {
      const view = document.querySelector('[data-personalized-display-view="colors"]')!
      expect(view.innerHTML).toContain('00ff00')
    })
  })
})
