#!/usr/bin/env zx

import { readFileSync } from 'fs'

import prompts from 'prompts'

const ecmPackageJson = () => JSON.parse(readFileSync('packages/ecm/package.json').toString())
const scmPackageJson = () => JSON.parse(readFileSync('packages/scm/package.json').toString())
const fetPackageJson = () => JSON.parse(readFileSync('packages/fet/package.json').toString())

function getModuleNaviDateFromEnv() {
  const envContent = readFileSync('./apps/module-navi/.env', 'utf8')
  const match = envContent.match(/NEXT_PUBLIC_LATEST_RELEASE_DATE=(.*)/)

  return match ? match[1].trim() : ''
}

async function main() {
  const defaultModuleNaviDate = getModuleNaviDateFromEnv()

  if (!defaultModuleNaviDate) {
    throw new Error('cannot read current module navi date')
  }

  const response = await prompts([
    {
      type: 'toggle',
      name: 'buildEcm',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: 'Build ECM?',
    },
    {
      type: (prev) => (prev ? 'toggle' : null),
      name: 'updateEcmVersion',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: 'Increment the version of ECM?',
    },
    {
      type: 'toggle',
      name: 'buildScm',
      initial: false,
      active: 'yes',
      inactive: 'no',
      message: 'Build SCM?',
    },
    {
      type: (prev) => (prev ? 'toggle' : null),
      name: 'updateScmVersion',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: 'Increment the version of SCM?',
    },
    {
      type: 'toggle',
      name: 'buildFet',
      initial: false,
      active: 'yes',
      inactive: 'no',
      message: 'Build FET?',
    },
    {
      type: (prev) => (prev ? 'toggle' : null),
      name: 'updateFetVersion',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: 'Increment the version of FET?',
    },
    {
      type: 'toggle',
      name: 'buildModuleNavi',
      initial: false,
      active: 'yes',
      inactive: 'no',
      message: 'Build ModuleNavi?',
    },
    {
      type: (prev) => (prev ? 'toggle' : null),
      name: 'updateModuleNaviDate',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: 'Update ModuleNavi date?',
    },
    {
      type: (prev) => (prev ? 'text' : null),
      name: 'moduleNaviDateInput',
      initial: defaultModuleNaviDate,
      message: 'ModuleNavi date?',
    },
  ])

  const { 
    buildEcm, 
    buildScm, 
    buildFet, 
    buildModuleNavi,
    updateEcmVersion, 
    updateScmVersion, 
    updateFetVersion, 
    updateModuleNaviDate,
    moduleNaviDateInput
  } = response

  const moduleNaviDate = moduleNaviDateInput ?? defaultModuleNaviDate

  await $`pnpm release:clean`

  if (updateModuleNaviDate) {
    await $`pnpm release:vup --module-navi-only ${moduleNaviDate}`
  }

  if (updateEcmVersion) {
    await $`pnpm release:vup --ecm-only`
  }

  if (updateScmVersion) {
    await $`pnpm release:vup --scm-only`
  }

  if (updateFetVersion) {
    await $`pnpm release:vup --fet-only`
  }

  if (buildEcm) {
    await $`pnpm build --filter=ecm --force`
  }

  if (buildScm) {
    await $`pnpm build --filter=scm --force`
  }

  if (buildFet) {
    await $`pnpm build --filter=fet --force`
  }

  await $`pnpm generate:outline-include`
  if (buildModuleNavi) {
    await $`pnpm generate:outline`
  }

  await $`git add -A`

  const commitMessageBase = `Release: ${moduleNaviDate}`;

  let commitMessageDetails = []
  if (buildEcm) {
    commitMessageDetails.push(`ECM: v${ecmPackageJson().version}`)
  }
  if (buildScm) {
    commitMessageDetails.push(`SCM: v${scmPackageJson().version}`)
  }
  if (buildFet) {
    commitMessageDetails.push(`FET: v${fetPackageJson().version}`)
  }
  const fullCommitMessage = [commitMessageBase, ...commitMessageDetails].join('\n')
  await $`git commit -m ${fullCommitMessage}`

  if (buildModuleNavi) {
    await $`pnpm build --filter=module-navi --force`
    await $`sed -i '' -e 's/latest/${moduleNaviDate}/g' ./apps/module-navi/.env`
    await $`sed -i '' -e 's/latest/${moduleNaviDate}/g' ./apps/module-navi/.env.production`
    await $`pnpm build --filter=module-navi --force`
    await $`git reset --hard`
    await $`git clean -df`
  }

  await $`pnpm release:output`
}

main()
