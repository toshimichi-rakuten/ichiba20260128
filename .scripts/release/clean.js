#!/usr/bin/env zx

import { existsSync, rmSync } from 'node:fs'

const builds = [
  'teamsite', 
  'packages/ecm/dist', 
  'packages/scm/dist', 
  'packages/fet/dist', 
  'apps/module-navi/out', 
  'apps/documents/out'
]

function main() {
  for (const build of builds) {
    if (existsSync(build)) {
      rmSync(build, { recursive: true, force: true })
    }
  }
}

main()
