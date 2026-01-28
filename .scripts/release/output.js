#!/usr/bin/env zx

import { cpSync, existsSync } from 'node:fs'

const builds = [
  { src: 'packages/ecm/dist', out: 'ecm' },
  { src: 'packages/scm/dist', out: 'scm' },
  { src: 'packages/fet/dist', out: 'fet' },
  { src: 'apps/module-navi/out', out: 'module-navi' },
]

function main() {
  for (const build of builds) {
    if (existsSync(build.src)) {
      cpSync(build.src, `teamsite/${build.out}`, { recursive: true })
    }
  }
}

main()
