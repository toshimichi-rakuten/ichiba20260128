import path, { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, type UserConfig } from 'vite'
import fs from 'fs'
import fse from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const snakey = (name: string): string => {
  return name.replaceAll('-', '_')
}

export const getShortVer = (version: string): string => {
  const nums = version.split('.')
  return `${nums[0]}.${nums[1]}`
}

export const banner = (assetInfo: { fileName: string }): string => {
  const date = new Date()
  return `/*!\n * ${assetInfo.fileName}\n * Copyright (c) ${date.getFullYear()} Rakuten Group Inc.\n * Date : ${date}\n */\n`
}

const syncRakutenSansFontPlugin = (fontName: string, shortVersion: string, fullVersion: string) => {
  return {
    name: 'syncRakutenSansFont',
    closeBundle: () => {
      const buildPath = path.resolve(process.cwd(), 'dist', 'rakuten_sans', fontName, shortVersion)

      if (!fs.existsSync(buildPath)) {
        console.log(`No build found at ${buildPath}. Skipping sync to ModuleNavi.`)
        return
      }

      const moduleNaviPath = path.resolve(
        process.cwd(),
        '../..',
        'apps',
        'module-navi',
        'public',
        '_assets',
        'bundles',
        'rakuten_sans',
        fontName,
        'latest'
      )

      console.log(`Copying ${buildPath}\n to ModuleNavi at ${moduleNaviPath}..`)
      fse.copySync(buildPath, moduleNaviPath)

      const moduleNaviFiles = fse.readdirSync(moduleNaviPath)
      for (let file of moduleNaviFiles) {
        const oldFilePath = path.join(moduleNaviPath, file)
        const newFileName = file.replace(fullVersion, 'latest')
        const newFilePath = path.join(moduleNaviPath, newFileName)
        fs.renameSync(oldFilePath, newFilePath)
      }
    },
  }
}

export const createFontBundleConfig = (entryFile: string, packageJson: any, outputName?: string): UserConfig => {
  const fileName = outputName || entryFile.replace('.scss', '')
  const bundleFileName = `${fileName}-${packageJson.version}.min`

  return defineConfig({
    resolve: {
      alias: {},
    },
    build: {
      emptyOutDir: false,
      cssTarget: ['safari12'],
      lib: {
        entry: resolve(__dirname, `src/${entryFile}`),
        name: `${packageJson.name}-${fileName}`,
        fileName: bundleFileName,
        formats: ['es'],
      },
      cssCodeSplit: true,
      target: ['es2019'],
      outDir: `dist/${snakey(packageJson.name)}/${fileName}/${getShortVer(packageJson.version!)}`,
      rollupOptions: {
        output: {
          banner: (assetInfo) => banner(assetInfo),
          chunkFileNames: `[name].[hash].js`,
          assetFileNames: (assetInfo) => {
            const cssFileName = entryFile.replace('.scss', '.css')
            if (assetInfo.name === cssFileName) {
              return `${bundleFileName}.css`
            }
            return `[name].[hash].[ext]`
          },
        },
      },
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    plugins: [syncRakutenSansFontPlugin(fileName, getShortVer(packageJson.version!), packageJson.version)],
  })
}
