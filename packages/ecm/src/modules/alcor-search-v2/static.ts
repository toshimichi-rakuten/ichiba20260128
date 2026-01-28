import { createHtml } from '../alcor-search/static'
import soloListTemplate from './solo_templates/solo_list.html?raw'
import soloEllipseTemplate from './solo_templates/solo_ellipse.html?raw'
import soloDefaultWithTextTemplate from './solo_templates/solo_default_with_text.html?raw'
import soloListWithTextTemplate from './solo_templates/solo_list_with_text.html?raw'
import soloListTopTitleWithTextTemplate from './solo_templates/solo_list_top_title_with_text.html?raw'

export const soloListHtml = createHtml(soloListTemplate)
export const soloEllipseHtml = createHtml(soloEllipseTemplate)
export const soloDefaultWithTextHtml = createHtml(soloDefaultWithTextTemplate)
export const soloListWithTextHtml = createHtml(soloListWithTextTemplate)
export const soloListTopTitleWithTextHtml = createHtml(soloListTopTitleWithTextTemplate)
