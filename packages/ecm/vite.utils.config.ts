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

const utilsBundleFileName = `${snakey(packageJson.name)}-utils-${packageJson.version}`

const banner = (assetInfo) => {
  const date = new Date()
  return `/*!\n * ${assetInfo.fileName}\n * Copyright (c) ${date.getFullYear()} Rakuten Group Inc.\n * Date : ${date}\n */\n`
}

// Temporary vite config to generate ecm-utils because multiple input with "umd" format is not supported in vite.
// TODO: Merge this back to vite.config.ts.
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: [resolve(__dirname, 'src/utils.scss')],
      name: packageJson.name,
      fileName: `${utilsBundleFileName}.min`,
      // DO NOT USE 'es' as it produce bundle that pollutes the global namespace.
      // https://git.rakuten-it.com/projects/ICWDCDG/repos/sidekick/pull-requests/1255/overview
      formats: ['es'],
    },
    cssCodeSplit: true,
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
          if (assetInfo.name == 'utils.css') {
            return `${utilsBundleFileName}.min.css`
          }
          return `[name].[hash].[ext]`
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  plugins: [syncBundleToDocsPlugin(getShortVer(packageJson.version), packageJson.version)],
})
