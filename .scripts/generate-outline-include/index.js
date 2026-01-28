import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { emptyDirSync } from 'fs-extra'
import { join } from 'path'

// `pnpm generate:update-cache`
const CACHE_VERSION = 202510201602

const groups = [
  {
    name: 'genre',
    count: 1,
  },
  {
    name: 'seasonal_gift',
    count: 3,
  },
  {
    name: 'service',
    count: 3,
  },
  {
    name: 'customer',
    count: 7,
  },
  {
    name: 'event',
    count: 5,
  },
  {
    name: 'social',
    count: 1,
  },
  {
    name: 'common_event',
    count: 1,
  },
]

function leftPad(num) {
  let padded = num.toString()

  while (padded.length < 3) {
    padded = `0${padded}`
  }

  return padded
}

function generate(group) {
  const getShortVer = (version) => {
    const nums = version.split('.')
    return `${nums[0]}.${nums[1]}`
  }

  const headTemplate = readFileSync('.scripts/generate-outline-include/template_ecm_head.html').toString()
  const headUtilsTemplate = readFileSync('.scripts/generate-outline-include/template_ecm_utils_head.html').toString()
  const bodySpTemplate = readFileSync('.scripts/generate-outline-include/template_ecm_body_sp.html').toString()
  const bodyPcTemplate = readFileSync('.scripts/generate-outline-include/template_ecm_body_pc.html').toString()
  const jqueryTemplate = readFileSync('.scripts/generate-outline-include/template_ecm_jquery.html').toString()

  const ecmPackageJson = JSON.parse(readFileSync('packages/ecm/package.json').toString())
  const ecmShortVersion = getShortVer(ecmPackageJson.version)

  const output = join(`packages/ecm/group_inc/${group.name}`)

  if (!existsSync(output)) {
    mkdirSync(output)
  }

  for (let i = 0; i < group.count; i++) {
    const head = headTemplate
      .replaceAll('%%ECM_SHORT_VERSION%%', ecmShortVersion)
      .replaceAll('%%ECM_LONG_VERSION%%', ecmPackageJson.version)
      .replaceAll('%%ECM_HEAD_INCLUDE_GROUP%%', `<!-- ECM_Include_File_Group_${group.name}_${leftPad(i + 1)} -->`)
      .replaceAll('%%CACHE_VERSION%%', CACHE_VERSION)

    const headPath = join(output, `${group.name}_${leftPad(i + 1)}_ecm_head.html`)

    writeFileSync(headPath, head)

    const headUtils = headUtilsTemplate
      .replaceAll('%%ECM_SHORT_VERSION%%', ecmShortVersion)
      .replaceAll('%%ECM_LONG_VERSION%%', ecmPackageJson.version)
      .replaceAll('%%CACHE_VERSION%%', CACHE_VERSION)

    const headUtilsPath = join(output, `${group.name}_${leftPad(i + 1)}_ecm_utils_head.html`)

    writeFileSync(headUtilsPath, headUtils)

    const bodySp = bodySpTemplate
      .replaceAll('%%ECM_SHORT_VERSION%%', ecmShortVersion)
      .replaceAll('%%ECM_LONG_VERSION%%', ecmPackageJson.version)
      .replaceAll('%%CACHE_VERSION%%', CACHE_VERSION)

    const bodySpPath = join(output, `${group.name}_${leftPad(i + 1)}_ecm_body_sp.html`)

    writeFileSync(bodySpPath, bodySp)

    const bodyPc = bodyPcTemplate
      .replaceAll('%%ECM_SHORT_VERSION%%', ecmShortVersion)
      .replaceAll('%%ECM_LONG_VERSION%%', ecmPackageJson.version)
      .replaceAll('%%CACHE_VERSION%%', CACHE_VERSION)

    const bodyPcPath = join(output, `${group.name}_${leftPad(i + 1)}_ecm_body_pc.html`)

    writeFileSync(bodyPcPath, bodyPc)

    const jquery = jqueryTemplate
    const jqueryPath = join(output, `${group.name}_${leftPad(i + 1)}_ecm_jquery.html`)

    writeFileSync(jqueryPath, jquery)
  }
}

function main() {
  const output = join(`packages/ecm/group_inc`)
  emptyDirSync(output)

  for (let group of groups) {
    generate(group)
  }
}

main()
