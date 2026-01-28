import templateHtml from './template.html?raw'
import { AISearchSettings, AISearchStyle } from '.'
import * as cheerio from 'cheerio'
import { oseiboSettings, oseiboStyle, xmasSettings, xmasStyle, localSettings } from './settings'

export const xmasHtml = createHtml(templateHtml, xmasSettings, xmasStyle)

export const oseiboHtml = createHtml(templateHtml, oseiboSettings, oseiboStyle)

export const localHtml = createHtml(templateHtml, localSettings, xmasStyle)

function createSettingsTag(settings: AISearchSettings): string {
  return `<script data-settings type="application/json">${JSON.stringify(settings, null, 2)}</script>`
}

function createStyleTag(styleVar: AISearchStyle): string {
  return `<style>
    :root {
      --scm-ai-search-theme-color: ${styleVar.themeColor};
      --scm-ai-search-sub-theme-color: ${styleVar.subThemeColor};
      --scm-ai-search-thumb-bg-color: ${styleVar.thumbBgColor};
      --scm-ai-search-thumb-size: ${styleVar.thumbSize};
      --scm-ai-search-track-height: ${styleVar.trackHeight};
      --scm-ai-search-track-color: ${styleVar.trackColor};
      --scm-ai-search-toggle-bg-color: ${styleVar.toggleBgColor};
      --scm-ai-search-hero-bg-texture: ${styleVar.heroBgTexture};
      --scm-ai-search-sm-grid-size: ${styleVar.smFilterGridSize};
      --scm-ai-search-md-grid-size: ${styleVar.mdFilterGridSize};
    }
  </style>`
}

// DOMParser is not available in Node so we use cheerio
function createHtml(html: string, settings: AISearchSettings, styleVariables: AISearchStyle): string {
  const $ = cheerio.load(html)
  const ai = $('[data-plugin-name="scm-ai-search"]').first()

  if (!ai.length) {
    throw new Error('root not found')
  }

  const settingsScript = createSettingsTag(settings)
  ai.prepend(settingsScript)

  const styleTag = createStyleTag(styleVariables)
  ai.prepend(styleTag)

  return $.html(ai)
}
