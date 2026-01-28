import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

const MODULE_NAVI_DOCS_PATH = path.resolve(
  process.cwd(),
  // process.cwd() is the directory of the package where turbo is currently running.
  // for example if turbo is currently building 'ecm' process.cwd() will be 'packages/ecm'.
  // to get the docs path, we go back 2 directories.
  '../..',
  'apps',
  'module-navi',
  'public',
  '_assets',
  'bundles'
)

const DOCUMENTS_DOCS_PATH = path.resolve(process.cwd(), '../..', 'apps', 'documents', 'public', '_assets', 'bundles')

function renameFile(directoryPath, file, fullVersion) {
  const oldFilePath = path.join(directoryPath, file)
  const newFileName = file.replace(fullVersion, 'latest')
  const newFilePath = path.join(directoryPath, newFileName)

  fs.renameSync(oldFilePath, newFilePath)
}

function sync(shortVersion, fullVersion) {
  const buildPath = path.resolve(process.cwd(), 'dist', shortVersion)

  if (!fs.existsSync(buildPath)) {
    console.log(`No build found at ${buildPath}. Skipping sync to ModuleNavi and Documents.`)
    return
  }

  const moduleNaviPath = path.resolve(MODULE_NAVI_DOCS_PATH, 'latest')

  console.log(`Copying ${buildPath}\n to ModuleNavi..`)
  fse.copySync(buildPath, moduleNaviPath)
  const moduleNaviFiles = fse.readdirSync(moduleNaviPath)
  for (let file of moduleNaviFiles) {
    renameFile(moduleNaviPath, file, fullVersion)
  }

  const documentsPath = path.resolve(DOCUMENTS_DOCS_PATH, 'latest')

  console.log(`Copying ${buildPath}\n to Documents..`)
  fse.copySync(buildPath, documentsPath)

  const documentsFiles = fse.readdirSync(documentsPath)
  for (let file of documentsFiles) {
    renameFile(documentsPath, file, fullVersion)
  }
}

export const syncBundleToDocsPlugin = (shortVersion, fullVersion) => {
  return {
    name: 'syncBundles',
    closeBundle: () => {
      sync(shortVersion, fullVersion)
    },
  }
}
