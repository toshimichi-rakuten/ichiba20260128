import dynamic from 'next/dynamic'

// Disable SSR for iframes since it won't render in server.
const Html = dynamic(() => import('./lazy'), {
  ssr: false,
})

export default Html
