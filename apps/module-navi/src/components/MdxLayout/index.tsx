import { ReactElement, useEffect, useRef, useState, RefObject, useContext, createContext } from 'react'
import Link from 'next/link'
import { ChevronIcon, MantineProvider } from '@mantine/core'
import { DownloadOutline } from 'src/components/DownloadOutline'
import { Search } from './search'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import {
  ecmToc,
  ecmSpecialAdToc,
  scmToc,
  scmGeneralToc,
  ecmGeneralToc,
  dealToc,
  dealAlcorToc,
  dealGeneralToc,
} from 'src/toc'
import { renderToStaticMarkup } from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import MdxComponents, { stringToValidHtmlId } from './mdx-components'
import ecmPackageJson from 'ecm/package.json'
import scmPackageJson from 'scm/package.json'
import { unescape } from 'html-escaper'
import dynamic from 'next/dynamic'

// HACK: Cannot SSG mantine style. Disable prerendering for now.
// https://v5.mantine.dev/theming/emotion-cache/#server-side-rendering-with-custom-cache
const MdxMain = dynamic(() => import('./mdx-main'), {
  ssr: false,
  loading: () => <div>読み込み中</div>,
})

const StagingMessage = dynamic(() => import('./staging-message'), {
  ssr: false,
})

export type PageUrl = {
  label: string
  href: string
  tag: string
}

export type PageHeaders = {
  [key: string]: PageUrl[]
}

type LayoutContextType = {
  type: 'ecm' | 'scm' | 'deal'
  mainRef?: RefObject<HTMLDivElement> | null
  content: string
}

export const LayoutContext = createContext<LayoutContextType>({
  type: 'ecm',
  content: '',
  mainRef: null,
})

function getPageHeaders(pathname: string, source: string): PageUrl[] {
  const regex = /<h[2-6]>(.*?)<\/h[2-6]>/g
  const matches = source.match(regex)

  if (matches && matches.length) {
    return matches.map((m) => {
      const raw = unescape(m)
      const clean = raw.replace(/<\/?h[2-6]>/g, '')
      const { id, display } = stringToValidHtmlId(clean)

      return {
        tag: m.slice(0, 4),
        label: display,
        href: `${pathname}#${id}`,
      }
    })
  }

  return []
}

function Sidebar() {
  const { type, content } = useContext(LayoutContext)
  const asideRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [pageHeaders, setPageHeaders] = useState<PageHeaders>({})

  const getHeaders = (path: string) => {
    // Hack, since the heading of ad-finder page is not in markdown.
    if (path.includes('ad-finder')) {
      return [
        {
          tag: '<h2>',
          label: '絞り込み検索',
          href: `${path}#絞り込み検索`,
        },
      ]
    }

    return pageHeaders[path] || []
  }

  const inViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect()

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  useEffect(() => {
    setPageHeaders((state) => {
      return {
        ...state,
        [router.pathname]: getPageHeaders(router.pathname, content),
      }
    })
  }, [content, router.pathname])

  // Scroll to sidebar to active page if it's the target is not visible.
  useEffect(() => {
    const target = asideRef?.current?.querySelector<HTMLElement>('[data-current-page="true"]')

    if (target) {
      const visible = inViewport(target)

      if (visible) {
        return
      }

      const top = target.getBoundingClientRect().top
      asideRef.current?.scrollBy(0, top)
    }
  }, [router.pathname])

  const ecmContent = (
    <>
      <div className={styles['sidebar-dl-wrapper']}>
        <DownloadOutline />
      </div>

      <div className={styles['link-group']}>
        <div className={styles['link-group-title']}>使い方・FAQ</div>
        {ecmGeneralToc.map((t) => (
          <SidebarItem
            key={t.url}
            url={t.url}
            title={t.title}
            headers={getHeaders(t.url)}
          />
        ))}
      </div>

      <div className={styles['link-group']}>
        <div className={styles['link-group-title']}>広告</div>
        {ecmSpecialAdToc.map((t) => (
          <SidebarItem
            key={t.url}
            url={t.url}
            title={t.title}
            headers={getHeaders(t.url)}
          />
        ))}
      </div>

      {[
        { route: 'campaign', label: 'キャンペーン関連' },
        { route: 'ui', label: 'UIパーツ' },
        { route: 'icon', label: 'アイコン' },
        { route: 'js', label: 'JSパーツ' },
        { route: 'css', label: 'CSSユーティリティ' },
        { route: 'ichiba-js', label: '市場共通JSパーツ' },
        { route: 'rakuten-font', label: 'Rakuten Font' },
        { route: 'dev', label: 'DEV' },
      ].map((g) => {
        const links = ecmToc
          .filter((t) => t.url.startsWith(`/ecm/docs/${g.route}`))
          .map((t) => {
            return (
              <SidebarItem
                key={t.url}
                url={t.url}
                title={t.title}
                headers={getHeaders(t.url)}
              />
            )
          })

        return (
          <div
            className={styles['link-group']}
            key={g.route}
          >
            <div className={styles['link-group-title']}>{g.label}</div>
            {links}
          </div>
        )
      })}
    </>
  )

  const scmContent = (
    <>
      <div className={styles['link-group']}>
        <div className={styles['link-group-title']}>シーズナルモジュール</div>
        {scmGeneralToc.map((t) => (
          <SidebarItem
            key={t.url}
            url={t.url}
            title={t.title}
            headers={getHeaders(t.url)}
          />
        ))}
      </div>

      {[
        { route: 'ad', label: '原稿タイプ' },
        { route: 'navi', label: 'ナビゲーション' },
        { route: 'header', label: 'ヘッダ' },
        { route: 'kanban', label: '看板・見出し' },
        { route: 'content', label: '下層ページ導線' },
        { route: 'other', label: 'その他' },
        { route: 'banner', label: 'バナー' },
        { route: 'footer', label: 'フッタ' },
        { route: 'css', label: 'CSSユーティリティ' },
      ].map((g) => {
        const links = scmToc
          .filter((t) => t.url.startsWith(`/scm/docs/${g.route}`))
          .map((t) => {
            return (
              <SidebarItem
                key={t.url}
                url={t.url}
                title={t.title}
                headers={getHeaders(t.url)}
              />
            )
          })

        return (
          <div
            className={styles['link-group']}
            key={g.route}
          >
            <div className={styles['link-group-title']}>{g.label}</div>
            {links}
          </div>
        )
      })}
    </>
  )

  const dealContent = (
    <>
      <div className={styles['link-group']}>
        <div className={styles['link-group-title']}>DEAL</div>
        {dealGeneralToc.map((t) => (
          <SidebarItem
            key={t.url}
            url={t.url}
            title={t.title}
            headers={getHeaders(t.url)}
          />
        ))}
      </div>

      <div className={styles['link-group']}>
        <div className={styles['link-group-title']}>アルコル</div>
        {dealAlcorToc.map((t) => (
          <SidebarItem
            key={t.url}
            url={t.url}
            title={t.title}
            headers={getHeaders(t.url)}
          />
        ))}
      </div>

      {[{ route: 'ad', label: '広告' }].map((g) => {
        const links = dealToc
          .filter((t) => t.url.startsWith(`/deal/docs/${g.route}`))
          .map((t) => {
            return (
              <SidebarItem
                key={t.url}
                url={t.url}
                title={t.title}
                headers={getHeaders(t.url)}
              />
            )
          })

        return (
          <div
            className={styles['link-group']}
            key={g.route}
          >
            <div className={styles['link-group-title']}>{g.label}</div>
            {links}
          </div>
        )
      })}
    </>
  )

  const contentMap = {
    ecm: ecmContent,
    scm: scmContent,
    deal: dealContent,
  }

  const sidebarNameMap = {
    ecm: 'Module Navi',
    scm: 'SCM',
    deal: 'DEAL',
  }

  const hrefMap = {
    ecm: '/ecm/docs',
    scm: '/scm/docs',
    deal: '/deal/docs',
  }

  const sidebarVersionMap = {
    ecm: `ecm-${ecmPackageJson.version}`,
    scm: `scm-${scmPackageJson.version}`,
    deal: `ecm-${ecmPackageJson.version}`,
  }

  return (
    <aside
      ref={asideRef}
      className={styles['sidebar']}
    >
      <div className={styles['sidebar-logo-wrapper']}>
        <Link
          className={styles['sidebar-logo']}
          href={hrefMap[type]}
        >
          <svg
            width={104}
            height={32}
            viewBox='0 0 104 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_12002_525)'>
              <path
                d='M83.6574 26.4345H20.7875L25.7995 31.4478L83.6574 26.4345Z'
                fill='#BF0000'
              />
              <path
                d='M26.614 6.14274V6.90196C25.4487 6.15529 24.4024 5.72235 22.9677 5.72235C18.5634 5.72235 15.2178 9.74431 15.2178 14.6824C15.2178 19.6267 18.5634 23.6424 22.9677 23.6424C24.4024 23.6424 25.4487 23.2094 26.614 22.4627V23.222H30.4858V6.14274H26.614ZM22.9615 19.5388C20.7875 19.5388 19.2024 17.3992 19.2024 14.6886C19.2024 11.9843 20.7937 9.8447 22.9615 9.8447C25.1354 9.8447 26.6704 11.9843 26.6704 14.6886C26.6704 17.3929 25.1417 19.5388 22.9615 19.5388Z'
                fill='#BF0000'
              />
              <path
                d='M57.626 6.14276V16.182C57.626 18.0643 56.3354 19.6518 54.4559 19.6518C52.5764 19.6518 51.2858 18.0643 51.2858 16.182V6.14276H47.414V16.182C47.414 20.2981 50.227 23.6486 54.3369 23.6486C56.2414 23.6486 57.626 22.5945 57.626 22.5945V23.2283H61.4978V6.14276H57.626Z'
                fill='#BF0000'
              />
              <path
                d='M93.7065 23.2282V13.189C93.7065 11.3067 94.9971 9.71921 96.8766 9.71921C98.7562 9.71921 100.047 11.3067 100.047 13.189V23.2282H103.919V13.189C103.919 9.07294 101.106 5.72235 96.9957 5.72235C95.0911 5.72235 93.7065 6.77647 93.7065 6.77647V6.14274H89.8347V23.2282H93.7065Z'
                fill='#BF0000'
              />
              <path
                d='M4.05351 23.2283V16.6087H6.91665L11.8723 23.2283H16.9407L10.9513 15.2408C12.8183 13.8981 14.0463 11.7145 14.0463 9.24238C14.0463 5.18278 10.7509 1.88239 6.69737 1.88239H0.00628662V23.2283H4.05351ZM4.05351 5.94199H6.69737C8.51424 5.94199 10.0053 7.42278 10.0053 9.24866C10.0053 11.0808 8.5205 12.5616 6.69737 12.5616H4.05351V5.94199Z'
                fill='#BF0000'
              />
              <path
                d='M71.9354 19.1874C71.5846 19.4259 71.146 19.6078 70.6386 19.6078C70.0058 19.6078 68.8154 19.1247 68.8154 17.5121V10.2023H72.1296V6.149H68.8154V1.88861H64.9436V6.149H62.895V10.2023H64.9436V17.5686C64.9436 21.3835 67.813 23.6612 70.7012 23.6612C71.7788 23.6612 73.2699 23.3098 74.4916 22.5882L71.9354 19.1874Z'
                fill='#BF0000'
              />
              <path
                d='M40.1089 14.1553L46.7499 6.14275H41.3243L36.6819 12.0973V0.476868H32.6911V23.2282H36.6819V16.2133L42.3894 23.2282H47.8149L40.1089 14.1553Z'
                fill='#BF0000'
              />
              <path
                d='M80.8819 5.70984C76.4024 5.70984 73.1884 9.6565 73.1884 14.6887C73.1884 19.9781 77.2231 23.6675 81.2704 23.6675C83.3128 23.6675 85.9316 22.9647 88.1244 19.84L84.7036 17.8636C82.0598 21.7663 77.6492 19.7836 77.1417 15.8808H88.2935C89.2458 9.74435 85.2863 5.70984 80.8819 5.70984ZM84.2588 12.48H77.2858C78.1003 8.48317 83.507 8.25101 84.2588 12.48Z'
                fill='#BF0000'
              />
            </g>
            <defs>
              <clipPath id='clip0_12002_525'>
                <rect
                  width={104}
                  height={32}
                  fill='white'
                />
              </clipPath>
            </defs>
          </svg>
          <span className={styles['sidebar-app-name']}>{sidebarNameMap[type]}</span>
        </Link>
        <span className={styles['sidebar-app-build']}>{process.env.NEXT_PUBLIC_LATEST_RELEASE_DATE}</span>
        <span className={styles['sidebar-app-ver']}>{sidebarVersionMap[type]}</span>
      </div>

      <div className={styles['sidebar-search-wrapper']}>
        <Search />
      </div>

      {contentMap[type]}
    </aside>
  )
}

function SidebarItem({ url, title, headers }: { url: string; title: string; headers: PageUrl[] }) {
  const { mainRef } = useContext(LayoutContext)
  const router = useRouter()
  const isActive = router.pathname == url

  const [accordionOpen, setOpen] = useState(isActive)
  const isOpen = isActive && accordionOpen

  const getStyle = (header: PageUrl) => {
    const indented = ['<h4>', '<h5>', '<h6>']

    if (indented.includes(header.tag)) {
      return `${styles['link-group-item-body-link']} ${styles['link-group-item-body-link-ml']}`
    }

    return styles['link-group-item-body-link']
  }

  const onClick = (h: PageUrl) => {
    const id = h.href.split('#')[1]
    const element = document.getElementById(id)

    if (element && mainRef?.current) {
      history.pushState(null, '', `#${id}`)

      const top = element.getBoundingClientRect().top
      mainRef.current.scrollBy(0, top)
    } else {
      router.push(h.href)
    }
  }

  return (
    <div
      className={`
        ${styles['link-group-item']} ${isOpen ? styles['open'] : ''}
      `}
      data-current-page={router.pathname == url}
    >
      <Link
        href={url}
        onClick={() => {
          setOpen(!isOpen)
        }}
        className={styles['link-group-item-header']}
      >
        <span>{title}</span>

        <ChevronIcon
          className={isOpen ? styles['open'] : ''}
          height={'16px'}
        />
      </Link>

      {headers.length ? (
        <div className={`${styles['link-group-item-body']} ${isOpen ? styles['open'] : ''}`}>
          {headers.map((h) => (
            <button
              key={h.href}
              className={getStyle(h)}
              onClick={() => onClick(h)}
            >
              {unescape(h.label)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function MdxLayout({
  children,
  type,
  showSidebar = true,
}: {
  children: ReactElement
  type: 'ecm' | 'scm' | 'deal'
  showSidebar?: boolean
}) {
  const content = renderToStaticMarkup(children)
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleRouteChange = () => {
      mainRef.current?.scrollTo({ top: 0 })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, content])

  return (
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
        <LayoutContext.Provider value={{ mainRef, type, content }}>
          <StagingMessage />
          <div className={styles['wrapper']}>
            {showSidebar && <Sidebar />}
            <main
              ref={mainRef}
              className={`${styles['main']} ${!showSidebar ? styles['main-no-sidebar'] : ''}`}
            >
              <button
                onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                className={styles['scroll-to-top']}
              >
                <svg
                  width='20'
                  height='12'
                  viewBox='0 0 20 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M19.0487 9.78146L9.99778 0.730489L8.58357 2.1447L8.58358 2.14471L0.944348 9.78395L2.35856 11.1982L9.99779 3.55893L17.6345 11.1957L19.0487 9.78146Z'
                    fill='#9C9C9C'
                  />
                </svg>
              </button>
              <MdxMain>{children}</MdxMain>
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  textAlign: 'center',
                  fontSize: '12px',
                }}
              >
                © Rakuten Group, Inc.
              </div>
            </main>
          </div>
        </LayoutContext.Provider>
      </MantineProvider>
    </MDXProvider>
  )
}

export default MdxLayout
