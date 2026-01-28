import { useState } from 'react'
import { default as ReactFrame } from 'react-frame-component'
import styles from './frame.module.scss'
import { ecmUtilsCss, ecmCss, ecmJs, fontFace, HeightHook, suppressNavigationScript } from 'src/components/Html/lazy'

function Html({ content }: { content: string }) {
  const [height, setHeight] = useState('667px')

  return (
    <div
      className={styles['iframe-layout']}
      style={{
        backgroundColor: '#717171',
        border: 'none',
        padding: '0px',
        minHeight: '667px',
        height: height,
      }}
    >
      <ReactFrame
        className={styles['iframe']}
        style={{ height: '100%', width: '100%' }}
        mountTarget='#root'
        initialContent={`
        <!doctype html>
        <head>
          ${fontFace}
          <link rel='stylesheet' href='${ecmCss}'/>
          <link rel='stylesheet' href='${ecmUtilsCss}'/>
        </head>
        <html>
          <body>
            <div class="ecm-wrap">
              <div id="root" data-module-name="ecm-dynamic-content"></div>
            </div>
            <script defer src='${ecmJs}'></script>
            ${suppressNavigationScript}
          </body>
        </html>
    `}
      >
        <HeightHook
          setHeight={setHeight}
          content={content}
        />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ReactFrame>
    </div>
  )
}

export default Html
