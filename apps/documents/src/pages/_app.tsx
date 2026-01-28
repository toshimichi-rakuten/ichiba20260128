import type { AppProps } from 'next/app'
import './reset.scss'
import './globals.scss'
import './mdx.scss'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

import styles from './app.module.scss'
import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'

function H1(props: { children: ReactNode }) {
  return (
    <h1
      style={{ fontSize: '36px', marginBottom: '28px' }}
      {...props}
    ></h1>
  )
}

function H2(props: { children: ReactNode }) {
  return (
    <h2
      style={{ fontSize: '28px', marginBottom: '28px' }}
      {...props}
    ></h2>
  )
}

function H3(props: { children: ReactNode }) {
  return (
    <h3
      style={{ fontSize: '20px', marginBottom: '28px' }}
      {...props}
    ></h3>
  )
}

function Anchor(props: { children: ReactNode }) {
  return (
    <a
      style={{ textDecoration: 'underline' }}
      {...props}
    ></a>
  )
}

function Code(props: { children: ReactNode }) {
  return (
    <code
      style={{
        paddingLeft: '2px',
        paddingRight: '2px',
        backgroundColor: 'rgba(0, 120, 181, 0.08)',
        fontFamily: 'JetBrains Mono',
      }}
      {...props}
    />
  )
}

const MdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H3,
  h5: H3,
  h6: H3,
  a: Anchor,
  code: Code,
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles['app']}>
      <MDXProvider components={MdxComponents}>
        <MantineProvider
          theme={{
            fontFamily: 'Noto Sans JP',
            fontFamilyMonospace: 'JetBrains Mono',
            primaryColor: 'crimson',
            colors: {
              crimson: [
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
                '#BF0000',
              ],
            },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </MDXProvider>
    </div>
  )
}
