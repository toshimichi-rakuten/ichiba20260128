import { readFileSync } from 'fs'

const ecmPackageJson = JSON.parse(readFileSync('packages/ecm/package.json').toString())
const ecmShortVersion = getShortVer(ecmPackageJson.version)
const scmPackageJson = JSON.parse(readFileSync('packages/scm/package.json').toString())
const scmShortVersion = getShortVer(scmPackageJson.version)
const fetPackageJson = JSON.parse(readFileSync('packages/fet/package.json').toString())
const fetShortVersion = getShortVer(fetPackageJson.version)

function getShortVer(version) {
  const nums = version.split('.')
  return `${nums[0]}.${nums[1]}`
}

const assets = [
  // CSS
  'https://r.r10s.jp/com/js/c/ecm/%%ECM_SHORT_VERSION%%/ecm-%%ECM_LONG_VERSION%%.min.css',
  // CSS Utils
  'https://r.r10s.jp/com/js/c/ecm/%%ECM_SHORT_VERSION%%/ecm-utils-%%ECM_LONG_VERSION%%.min.css',
  // JS
  'https://r.r10s.jp/com/js/c/ecm/%%ECM_SHORT_VERSION%%/ecm-%%ECM_LONG_VERSION%%.min.js',
  // CSS 
  'https://r.r10s.jp/com/js/c/scm/%%SCM_SHORT_VERSION%%/scm-%%SCM_LONG_VERSION%%.min.css',
  // JS
  'https://r.r10s.jp/com/js/c/scm/%%SCM_SHORT_VERSION%%/scm-%%SCM_LONG_VERSION%%.min.js',
  // JS ONLY
  'https://r.r10s.jp/com/js/c/fet/%%FET_SHORT_VERSION%%/fet-%%FET_LONG_VERSION%%.min.js',
].map((a) => {
  return a
    .replaceAll('%%ECM_SHORT_VERSION%%', ecmShortVersion)
    .replaceAll('%%ECM_LONG_VERSION%%', ecmPackageJson.version)
    .replaceAll('%%SCM_SHORT_VERSION%%', scmShortVersion)
    .replaceAll('%%SCM_LONG_VERSION%%', scmPackageJson.version)
    .replaceAll('%%FET_SHORT_VERSION%%', fetShortVersion)
    .replaceAll('%%FET_LONG_VERSION%%', fetPackageJson.version)
})

async function main() {
  const promises = assets.map(async (a) => {
    const res = await fetch(a)

    return {
      asset: a,
      exists: res.ok,
    }
  })

  const done = await Promise.allSettled(promises)
  let exit = 0

  for (let d of done) {
    if (!d?.value?.exists) {
      exit = 1
    }
    const status = d?.value?.exists ? 'OK' : 'ERROR'
    console.log(`[${status}]: `, d?.value?.asset)
  }

  process.exit(exit)
}

main()
