import { resolve } from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import { syncBundleToDocsPlugin } from '../../.plugins/sync-bundles-to-docs.js'

const snakey = (name) => {
  return name.replaceAll('-', '_')
}

const getShortVer = (version) => {
  const nums = version.split('.')
  return `${nums[0]}.${nums[1]}`
}

const bundleFileName = `${snakey(packageJson.name)}-${packageJson.version}`

const banner = (assetInfo) => {
  const date = new Date()
  return `/*!\n * ${assetInfo.fileName}\n * Copyright (c) ${date.getFullYear()} Rakuten Group Inc.\n * Date : ${date}\n */\n`
}

export default defineConfig({
  // We got far away using only pnpm workspace and absolute import to keep the project config simple.
  // But it stopped working when we started importing files that have absolute import inside.

  // This worked fine before without the need for aliases.
  // (from module-navi) import stuff from 'ecm/src/no_import.html'

  // This doesn't work because it has an absolute import inside.
  // (from module-navi) import stuff from 'ecm/src/has-absolute-import.ts'

  // To fix this, we needed to start using alias import
  // and resolve it in tsconfig of the package that needs to import.

  // With alias, now we can make it work like this:
  // (from module-navi) import stuff from '@ecm/src/has-absolute-import.ts'
  resolve: {
    alias: {
      '@ecm': resolve(__dirname, 'src'),
    },
  },
  build: {
    cssTarget: ['safari12'],
    emptyOutDir: false,
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')],
      name: packageJson.name,
      fileName: (_format) => `${bundleFileName}.min.js`,
      // DO NOT USE 'es' as it produce bundle that pollutes the global namespace.
      // https://git.rakuten-it.com/projects/ICWDCDG/repos/sidekick/pull-requests/1255/overview
      formats: ['umd'],
    },
    cssCodeSplit: false,
    /**
     * Kinda different with browserlist:
     * https://github.com/evanw/esbuild/issues/121
     */
    target: ['es2019'],
    outDir: `dist/${getShortVer(packageJson.version)}`,
    rollupOptions: {
      output: {
        banner: (assetInfo) => banner(assetInfo),
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') {
            return `${bundleFileName}.min.css`
          }
          return `[name].[hash].[ext]`
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  assetsInclude: ['/sb-preview/runtime.js'],
  plugins: [syncBundleToDocsPlugin(getShortVer(packageJson.version), packageJson.version)],
})
