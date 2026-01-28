import { Meta } from '@storybook/html'
import { ECM } from '@ecm/core'
import { AISearch } from '.'
import 'ecm/src/core/index.scss'
import '../../index.scss'
import '../../utils.scss'
import '../../utils_md.scss'
import '../../utils_lg.scss'
import 'ecm/src/core/utils.scss'
import 'ecm/src/core/utils_md.scss'
import 'ecm/src/core/utils_lg.scss'
import { oseiboHtml, xmasHtml, localHtml } from './html'
import {
  mockFetchSuggestOk,
  mockFetchSuggestError,
  mockFetchSuggestLoading,
  mockFetchSearchOk,
  mockFetchSearchError,
  mockFetchSearchLoading,
  mockFetchSearchNoResult,
} from './mock'

function init(fetchSuggest: any, fetchSearch: any) {
  return () => {
    new ECM()
    const root = document.querySelector('[data-plugin-name="scm-ai-search"]') as HTMLElement
    new AISearch(root, { fetchSuggest, fetchSearch })
  }
}

const Story: Meta = {
  title: 'Modules/AISearch',
}

export default Story

export const Default = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(mockFetchSuggestOk, mockFetchSearchOk)()
  },
}

export const SearchNoResult = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(mockFetchSuggestOk, mockFetchSearchNoResult)()
  },
}

export const SearchLoading = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(mockFetchSuggestOk, mockFetchSearchLoading)()
  },
}

export const SearchError = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(mockFetchSuggestOk, mockFetchSearchError)()
  },
}

export const SuggestLoading = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(mockFetchSuggestLoading, mockFetchSearchOk)()
  },
}

export const SuggestError = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(mockFetchSuggestError, mockFetchSearchOk)()
  },
}

export const IntegrationXmas = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${xmasHtml}
    </div>
  `,
  play: () => {
    init(undefined, undefined)()
  },
}

export const IntegrationOseibo = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${oseiboHtml}
    </div>
  `,
  play: () => {
    init(undefined, undefined)()
  },
}

export const Local = {
  render: () => `
    <div style="margin: -1rem; padding-bottom: 2rem;">
      ${localHtml}
    </div>
  `,
  play: () => {
    init(undefined, undefined)()
  },
}
