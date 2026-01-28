import { useEffect, useState } from 'react'
import Frame, { useFrame } from 'react-frame-component'
import styles from './index.module.scss'
import {
  rakutenCondensedFontFace,
  rakutenRoundedFontFace,
  rakutenSerifFontFace,
  rakutenSansJp2FontFace,
  rakutenSansJp2TnFontFace,
} from './rakutenFontFaces'

// Do not import from ecm/scm to keep build dep simple.
const ECM_INITIALIZE_BLOCK_EVENT_NAME = 'ecmInitializeBlock'
const SCM_INITIALIZE_BLOCK_EVENT_NAME = 'scmInitializeBlock'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, '0')
const day = String(currentDate.getDate()).padStart(2, '0')
const hours = String(currentDate.getHours()).padStart(2, '0')
const minutes = String(currentDate.getMinutes()).padStart(2, '0')

const formattedDate = `${year}${month}${day}${hours}${minutes}`

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const ecmCss = `${BASE_PATH}/_assets/bundles/latest/ecm-latest.min.css?v=${formattedDate}`

export const ecmUtilsCss = `${BASE_PATH}/_assets/bundles/latest/ecm-utils-latest.min.css?v=${formattedDate}`

export const rakutenCondensedCss = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_condensed/latest/rakuten_condensed-latest.min.css?v=${formattedDate}`

export const rakutenRoundedCss = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_rounded/latest/rakuten_rounded-latest.min.css?v=${formattedDate}`

export const rakutenSerifCss = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_serif/latest/rakuten_serif-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2_300Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2_300/latest/rakuten_sans_jp2_300-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2_400Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2_400/latest/rakuten_sans_jp2_400-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2_500Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2_500/latest/rakuten_sans_jp2_500-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2_600Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2_600/latest/rakuten_sans_jp2_600-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2_700Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2_700/latest/rakuten_sans_jp2_700-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2_800Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2_800/latest/rakuten_sans_jp2_800-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2Tn_300Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2tn_300/latest/rakuten_sans_jp2tn_300-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2Tn_400Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2tn_400/latest/rakuten_sans_jp2tn_400-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2Tn_500Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2tn_500/latest/rakuten_sans_jp2tn_500-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2Tn_600Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2tn_600/latest/rakuten_sans_jp2tn_600-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2Tn_700Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2tn_700/latest/rakuten_sans_jp2tn_700-latest.min.css?v=${formattedDate}`

export const rakutenSansJp2Tn_800Css = `${BASE_PATH}/_assets/bundles/rakuten_sans/rakuten_sans_jp2tn_800/latest/rakuten_sans_jp2tn_800-latest.min.css?v=${formattedDate}`

export const scmCss = `${BASE_PATH}/_assets/bundles/latest/scm-latest.min.css?v=${formattedDate}`

export const ecmJs = `${BASE_PATH}/_assets/bundles/latest/ecm-latest.min.js?v=${formattedDate}`

export const scmJs = `${BASE_PATH}/_assets/bundles/latest/scm-latest.min.js?v=${formattedDate}`

export const fontFace = `
<style>
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
src: url('${BASE_PATH}/_assets/fonts/Roboto-Medium.woff') format('woff');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
    U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: url('${BASE_PATH}/_assets/fonts/Roboto-Bold.woff') format('woff');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
    U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'YakuHanJPs';
  font-style: normal;
  font-weight: 400;
  src: url('${BASE_PATH}/_assets/fonts/YakuHanJPs-Regular.woff') format('woff');
}

@font-face {
  font-family: 'YakuHanJPs';
  font-style: normal;
  font-weight: 700;
  src: url('${BASE_PATH}/_assets/fonts/YakuHanJPs-Bold.woff') format('woff');
}

@font-face {
  font-family: 'ecm-genre-icon';
  src: url('${BASE_PATH}/_assets/fonts/ecm-genre-icon.woff?v=20250101') format('woff');
}
</style>
`

const iife = (code: string) => {
  return `
<script>
(function() {
  ${code}
})()
</script>
`
}

export const suppressNavigationScript = iife(`
const suppress = () => {
  const anchors = document.querySelectorAll('a');
  for (let a of [...anchors]) {
    if (!a.hasAttribute('href') || a.hasAttribute('data-module-navi-suppressed')) {
      continue
    }

    const isLegit = a.getAttribute('target') === "_top";
    if (isLegit) {
      continue
    }

    a.addEventListener('click', (e) => {
      e.preventDefault();
    })
    a.setAttribute('data-module-navi-suppressed', 'true');
  }
}

const callback = (mutations) => {
  suppress();
}

const mutation = new MutationObserver(callback);
const body = document.querySelector('body');
mutation.observe(body, {
  childList: true, subtree: true
});
`)

export const initializeBlockScript = iife(`
const root = document.getElementById('root');

const dispatchInitializeEvent = () => {
  const event = new CustomEvent('${ECM_INITIALIZE_BLOCK_EVENT_NAME}', {
    detail: {
      target: root,
    },
  });

  document.dispatchEvent(event);
};

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      dispatchInitializeEvent();
      observer.disconnect();
      break;
    }
  }
});

observer.observe(root, {
  childList: true,
  subtree: true
});
`)

export const scmInitializeBlockScript = iife(`
const root = document.getElementById('root');

const dispatchInitializeEvent = () => {
  const event = new CustomEvent('${SCM_INITIALIZE_BLOCK_EVENT_NAME}', {
    detail: {
      target: root,
    },
  });

  document.dispatchEvent(event);
};

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      dispatchInitializeEvent();
      observer.disconnect();
      break;
    }
  }
});

observer.observe(root, {
  childList: true,
  subtree: true
});
`)

export function HeightHook({ setHeight, content }: { setHeight: (string: string) => void; content: string }) {
  const { document } = useFrame()

  useEffect(() => {
    if (!document) {
      return
    }

    setHeight(`${document.body.scrollHeight}px`)
  }, [document, setHeight, content])

  return null
}

function Html({
  content,
  contentPadding = '16px',
  device = 'sp',
  full = false,
  height,
  scm = false,
  adHighlight = false,
  sliderItemHighlight = false,
  rakutenCondensed = false,
  rakutenRounded = false,
  rakutenSerif = false,
  rakutenSansJp2 = false,
  rakutenSansJp2Tn = false,
}: {
  content: string
  contentPadding?: string
  device?: any
  full?: boolean
  height?: string
  scm?: boolean
  adHighlight?: boolean
  sliderItemHighlight?: boolean
  rakutenCondensed?: boolean
  rakutenRounded?: boolean
  rakutenSerif?: boolean
  rakutenSansJp2?: boolean
  rakutenSansJp2Tn?: boolean
}) {
  const devices = {
    sp: '375px',
    md: '768px',
    lg: '1024px',
    pc: '100%',
    '320': '320px',
    '360': '360px',
    '375': '375px',
    '414': '414px',
  }

  const iframeWidth = devices[device] || '375px'
  const [contentHeight, setContentHeight] = useState('80px')

  let appliedHeight = height

  if (!appliedHeight) {
    appliedHeight = full ? contentHeight : '667px'
  }

  return (
    <div className={styles['iframe-layout']}>
      <Frame
        className={styles['iframe']}
        style={{ width: iframeWidth, height: appliedHeight }}
        mountTarget='#root'
        initialContent={`
        <!doctype html>
        <html style="height: 100%;">
          <head>
            ${fontFace}
            ${rakutenCondensed ? rakutenCondensedFontFace : ''}
            ${rakutenRounded ? rakutenRoundedFontFace : ''}
            ${rakutenSerif ? rakutenSerifFontFace : ''}
            ${rakutenSansJp2 ? rakutenSansJp2FontFace : ''}
            ${rakutenSansJp2Tn ? rakutenSansJp2TnFontFace : ''}
            ${rakutenCondensed ? `<link rel='stylesheet' href='${rakutenCondensedCss}'/>` : ''}
            ${rakutenRounded ? `<link rel='stylesheet' href='${rakutenRoundedCss}'/>` : ''}
            ${rakutenSerif ? `<link rel='stylesheet' href='${rakutenSerifCss}'/>` : ''}
            ${
              rakutenSansJp2
                ? `
            <link rel='stylesheet' href='${rakutenSansJp2_300Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2_400Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2_500Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2_600Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2_700Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2_800Css}'/>
            `
                : ''
            }
            ${
              rakutenSansJp2Tn
                ? `
            <link rel='stylesheet' href='${rakutenSansJp2Tn_300Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2Tn_400Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2Tn_500Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2Tn_600Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2Tn_700Css}'/>
            <link rel='stylesheet' href='${rakutenSansJp2Tn_800Css}'/>
            `
                : ''
            }

            <link rel='stylesheet' href='${ecmCss}'/>
            ${scm ? `<link rel='stylesheet' href='${scmCss}'/>` : ''}
            <link rel='stylesheet' href='${ecmUtilsCss}'/>
            ${
              adHighlight
                ? `
              <style>
                [data-ad-id]:first-child {
                  outline: 3px solid yellow;
                  outline-offset: -3px;
                }
              </style>
            `
                : ''
            }
            ${
              sliderItemHighlight
                ? `
              <style>
                .ecm-slider-slide:first-child {
                  outline: 3px solid yellow;
                  outline-offset: -3px;
                }
              </style>
            `
                : ''
            }
          </head>
          <body style="padding: ${contentPadding}; margin: 0;">
            <div id="root" class="ecm-wrap" data-module-name="ecm-dynamic-content"></div>
            <script src='${ecmJs}'></script>
            ${scm ? `<script src='${scmJs}'></script>` : ''}
            ${initializeBlockScript}
            ${scm ? `${scmInitializeBlockScript}` : ''}
            ${suppressNavigationScript}
          </body>
        </html>
        `}
      >
        <HeightHook
          setHeight={setContentHeight}
          content={content}
        />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Frame>
    </div>
  )
}

export default Html
