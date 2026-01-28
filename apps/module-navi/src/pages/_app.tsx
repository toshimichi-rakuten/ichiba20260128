import type { AppProps } from 'next/app'
import MdxLayout from 'src/components/MdxLayout'
import './reset.scss'
import './globals.scss'
import './mdx.scss'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
// For icon module.
// This ia a hack because normally we use iframe to separate the style, but it should not be a problem for icon.
import 'ecm/src/modules/icon/index.scss'
import 'ecm/src/modules/genre-icon/index.scss'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.pathname.startsWith('/scm') || router.pathname.startsWith('/ecm') || router.pathname.startsWith('/deal')) {
    const type = router.pathname.split('/')[1] as 'scm' | 'ecm' | 'deal'

    return (
      <MdxLayout type={type}>
        <Component {...pageProps} />
      </MdxLayout>
    )
  }

  return <Component {...pageProps} />
}
