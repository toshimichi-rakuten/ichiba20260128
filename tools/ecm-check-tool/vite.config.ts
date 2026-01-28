import { resolve } from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'

const snakey = (name) => {
  return name.replaceAll('-', '_')
}

const banner = (assetInfo) => {
  const date = new Date()
  return `/*!\n * ${assetInfo.fileName}\n * Copyright (c) ${date.getFullYear()} Rakuten Group Inc.\n * Date : ${date}\n */\n`
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: packageJson.name,
      fileName: `${snakey(packageJson.name)}.min.umd`,
      formats: ['es'],
    },
    /**
     * Kinda different with browserlist:
     * https://github.com/evanw/esbuild/issues/121
     */
    target: ['es2019'],
    outDir: `dist/`,
    rollupOptions: {
      output: {
        banner: (assetInfo) => banner(assetInfo),
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') {
            return `${snakey(packageJson.name)}.min.css`
          }
          return `[name].[hash].[ext]`
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
