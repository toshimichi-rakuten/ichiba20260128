import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

// const __dirname = path.dirname(__filename)

const moduleNaviName = resolve(__filename, '../../apps/module-navi/', '.env.production')
const moduleNaviContent = `
NEXT_PUBLIC_BASE_PATH=
`

writeFileSync(moduleNaviName, moduleNaviContent, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Created: ${moduleNaviName}`)
  }
})
