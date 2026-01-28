import integrationHtml from './integration_template.html?raw'
import soloTemplateHtml from './solo_template.html?raw'

export function createHtml(soloHtml: string, containerClass: string) {
  return integrationHtml.replaceAll('%SOLO%', soloHtml).replaceAll('%CONTAINER_CLASS%', containerClass)
}

export const SP2columnPC4column = createHtml(
  soloTemplateHtml,
  'd-grid d-grid-col-2 d-grid-gap-x-12 d-grid-gap-y-24 md-d-grid-col-4 md-d-grid-gap-x-24 md-d-grid-gap-y-32'
)
