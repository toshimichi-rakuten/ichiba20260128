import defaultGridHtml from './default_grid.html?raw'
import defaultLinkHtml from './default_link.html?raw'
import tabGridHtml from './tab_grid.html?raw'
import tabLinkHtml from './tab_link.html?raw'
import genreGridHtml from './genre_grid.html?raw'
import genreAccordionHtml from './genre_accordion.html?raw'
import tabGenreGridHtml from './tab_genre_grid.html?raw'
import tabGenreAccordionHtml from './tab_genre_accordion.html?raw'
import filterHtml from './filter.html?raw'

function addDummyData(baseUrl: string, template: string) {
  return template
    .replace(`20230926`, `${baseUrl}/genre.json`)
    .replace(`★★★coupons.json★★★`, `${baseUrl}/coupons_1.json`)
    .replace(`★★★coupons.json★★★`, `${baseUrl}/coupons_2.json`)
    .replace(`★★★coupons.json★★★`, `${baseUrl}/coupons_3.json`)
}

export const createStaticDefaultGridHtml = (baseUrl: string) => addDummyData(baseUrl, defaultGridHtml)
export const createStaticDefaultLinkHtml = (baseUrl: string) => addDummyData(baseUrl, defaultLinkHtml)
export const createStaticTabGridHtml = (baseUrl: string) => addDummyData(baseUrl, tabGridHtml)
export const createStaticTabLinkHtml = (baseUrl: string) => addDummyData(baseUrl, tabLinkHtml)
export const createStaticGenreGridHtml = (baseUrl: string) => addDummyData(baseUrl, genreGridHtml)
export const createStaticGenreAccordionHtml = (baseUrl: string) => addDummyData(baseUrl, genreAccordionHtml)
export const createStaticTabGenreGridHtml = (baseUrl: string) => addDummyData(baseUrl, tabGenreGridHtml)
export const createStaticTabGenreAccordionHtml = (baseUrl: string) => addDummyData(baseUrl, tabGenreAccordionHtml)
export const createStaticFilterHtml = (baseUrl: string) => addDummyData(baseUrl, filterHtml)

export const StaticDefaultGridHtml = createStaticDefaultGridHtml('/_assets/testdata')
export const StaticDefaultLinkHtml = createStaticDefaultLinkHtml('/_assets/testdata')
export const StaticTabGridHtml = createStaticTabGridHtml('/_assets/testdata')
export const StaticTabLinkHtml = createStaticTabLinkHtml('/_assets/testdata')
export const StaticGenreGridHtml = createStaticGenreGridHtml('/_assets/testdata')
export const StaticGenreAccordionHtml = createStaticGenreAccordionHtml('/_assets/testdata')
export const StaticTabGenreGridHtml = createStaticTabGenreGridHtml('/_assets/testdata')
export const StaticTabGenreAccordionHtml = createStaticTabGenreAccordionHtml('/_assets/testdata')
export const StaticFilterHtml = createStaticFilterHtml('/_assets/testdata')
