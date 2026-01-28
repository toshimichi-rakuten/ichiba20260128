import { Html, Head, Main, NextScript } from 'next/document'
import { addBasePath } from 'src/utils'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'ecm-genre-icon';
                src: url('${addBasePath('/_assets/fonts/ecm-genre-icon.woff')}') format('woff');
              }
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
