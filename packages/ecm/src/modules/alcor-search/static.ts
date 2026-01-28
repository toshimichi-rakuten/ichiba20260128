import integrationTemplate from './integration_template.html?raw'
import soloListTemplate from './solo_templates/solo_list.html?raw'
import soloEllipseTemplate from './solo_templates/solo_ellipse.html?raw'
import soloDefaultWithTextTemplate from './solo_templates/solo_default_with_text.html?raw'
import soloListWithTextTemplate from './solo_templates/solo_list_with_text.html?raw'
import soloListTopTitleWithTextTemplate from './solo_templates/solo_list_top_title_with_text.html?raw'

const keyword1 = `
<div data-key="keyword">キムチ</div>
<div data-key="search-url">https://search.rakuten.co.jp/search/mall/%E3%82%AD%E3%83%A0%E3%83%81%E3%80%80%E9%9F%93%E5%9B%BD/201050/?nitem=%E9%9F%93%E5%9B%BD%E9%A2%A8%E3%80%80%E6%97%A5%E6%9C%AC</div>
<div data-key="description">ヘアアイロンアゲツヤ チタニウム</div>
`

const keyword2 = `
<div data-key="keyword">韓国ラーメン</div>
<div data-key="search-url">https://search.rakuten.co.jp/search/mall/%E9%9F%93%E5%9B%BD%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3/110487/</div>
<div data-key="description">ヘアアイロンアゲツヤ チタニウム プロフェッショナルヘアアイロンレビューで【送料無料】【アゲツヤ プロフェッショナル チタニウムヘアアイロン】</div>
`

const data1 = `
<div data-alcor-item>
  <div data-key="item-url">https://item.rakuten.co.jp/kimchi88/kimuchi-0001/</div>
  <div data-key="image-url">https://tshop.r10s.jp/kimchi88/cabinet/kimchi2019.jpg</div>
</div>
`

const data2 = `
<div data-alcor-item>
  <div data-key="item-url">https://item.rakuten.co.jp/jetprice/x29237/</div>
  <div data-key="image-url">https://tshop.r10s.jp/jetprice/cabinet/147/669733.jpg</div>
</div>
`

export function createHtml(template: string) {
  return (
    integrationTemplate
      .replace('<!--★★searchalcor01 keywordとsearch-urlとdescriptionを設定★★-->', keyword1)
      .replace('<!--#include virtual="★★作成したsearchalcor01アルコルのパス★★"-->', data1)
      .replace('<!--★★searchalcor02 keywordとsearch-urlとdescriptionを設定★★-->', keyword2)
      .replace('<!--#include virtual="★★作成したsearchalcor02アルコルのパス★★"-->', data2)
      .replaceAll('%SOLO%', template)
      // This is a hack to demo properly
      .replaceAll('ecm-search-alcor-image-container-touch', 'md-d-none')
      // This is a hack to demo properly
      .replaceAll('ecm-search-alcor-image-container-mouse', 'd-none md-d-block')
      // This is a hack to demo properly
      .replaceAll('ecm-search-alcor-v2-image-container-touch', 'md-d-none')
      // This is a hack to demo properly
      .replaceAll('ecm-search-alcor-v2-image-container-mouse', 'd-none md-d-block')
  )
}

export const soloListHtml = createHtml(soloListTemplate)
export const soloEllipseHtml = createHtml(soloEllipseTemplate)
export const soloDefaultWithTextHtml = createHtml(soloDefaultWithTextTemplate)
export const soloListWithTextHtml = createHtml(soloListWithTextTemplate)
export const soloListTopTitleWithTextHtml = createHtml(soloListTopTitleWithTextTemplate)
