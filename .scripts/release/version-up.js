#!/usr/bin/env zx

import { readFileSync } from 'fs'

const ecmPackageJson = JSON.parse(readFileSync('packages/ecm/package.json').toString())
const scmPackageJson = JSON.parse(readFileSync('packages/scm/package.json').toString())
const fetPackageJson = JSON.parse(readFileSync('packages/fet/package.json').toString())

function timestamp() {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const timestamp = year.toString() + month.toString() + day.toString()

  return timestamp
}

function incrementMinorVersion(version) {
  let char = version.split('.')
  char[1] = parseInt(char[1]) + 1
  char[2] = 0
  return char.join('.')
}

async function main() {
  const flag = process.argv[3]

  const nextEcmVersion = incrementMinorVersion(ecmPackageJson.version)
  const nextScmVersion = incrementMinorVersion(scmPackageJson.version)
  const nextFetVersion = incrementMinorVersion(fetPackageJson.version)
  const moduleNaviDate = process.argv[4] ?? timestamp()

  // all
  if (!flag) {
    await $`sed -i '' -e 's/NEXT_PUBLIC_LATEST_RELEASE_DATE=.*/NEXT_PUBLIC_LATEST_RELEASE_DATE=${moduleNaviDate}/' ./apps/module-navi/.env`

    await $`jq '.version="${nextEcmVersion}"' packages/ecm/package.json > tempEcm.json`
    await $`mv tempEcm.json packages/ecm/package.json`

    await $`jq '.version="${nextScmVersion}"' packages/scm/package.json > tempScm.json`
    await $`mv tempScm.json packages/scm/package.json`

    await $`jq '.version="${nextFetVersion}"' packages/fet/package.json > tempFet.json`
    await $`mv tempFet.json packages/fet/package.json`

    return
  }

  if (flag == '--module-navi-only') {
    await $`sed -i '' -e 's/NEXT_PUBLIC_LATEST_RELEASE_DATE=.*/NEXT_PUBLIC_LATEST_RELEASE_DATE=${moduleNaviDate}/' ./apps/module-navi/.env`
  }

  if (flag == '--ecm-only') {
    await $`jq '.version="${nextEcmVersion}"' packages/ecm/package.json > tempEcm.json`
    await $`mv tempEcm.json packages/ecm/package.json`
  }

  if (flag == '--scm-only') {
    await $`jq '.version="${nextScmVersion}"' packages/scm/package.json > tempScm.json`
    await $`mv tempScm.json packages/scm/package.json`
  }

  if (flag == '--fet-only') {
    await $`jq '.version="${nextFetVersion}"' packages/fet/package.json > tempFet.json`
    await $`mv tempFet.json packages/fet/package.json`
  }
}

main()
