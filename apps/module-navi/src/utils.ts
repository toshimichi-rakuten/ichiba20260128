import packageJson from 'scm/package.json'

const getShortVer = (version) => {
  const nums = version.split('.')
  return `${nums[0]}.${nums[1]}`
}

// Next/Link component do not need this.
export function addBasePath(href: string) {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${BASE_PATH}${href}`
}

export function getScmCssHref() {
  const folder = getShortVer(packageJson.version)
  return `https://r.r10s.jp/com/js/c/scm/${folder}/scm-${packageJson.version}.min.css?v=20240101`
}

export function getScmJsHref() {
  const folder = getShortVer(packageJson.version)
  return `https://r.r10s.jp/com/js/c/scm/${folder}/scm-${packageJson.version}.min.js?v=20251016`
}
