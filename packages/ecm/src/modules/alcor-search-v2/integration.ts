import { createHtml } from '../alcor-search/integration'
import soloListTemplate from './solo_templates/solo_list.html?raw'
import soloEllipseTemplate from './solo_templates/solo_ellipse.html?raw'
import soloDefaultWithTextTemplate from './solo_templates/solo_default_with_text.html?raw'
import soloListWithTextTemplate from './solo_templates/solo_list_with_text.html?raw'
import soloListTopTitleWithTextTemplate from './solo_templates/solo_list_top_title_with_text.html?raw'

export const integrationListHtml = createHtml(soloListTemplate)
export const integrationEllipseHtml = createHtml(soloEllipseTemplate)
export const integrationDefaultWithTextHtml = createHtml(soloDefaultWithTextTemplate)
export const integrationListWithTextHtml = createHtml(soloListWithTextTemplate)
export const integrationListTopTitleWithTextHtml = createHtml(soloListTopTitleWithTextTemplate)
