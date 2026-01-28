import mdx from '@next/mdx'

const withMDX = mdx()

if (!process.env.NEXT_PUBLIC_DIST_DIR) {
  throw new Error('NEXT_PUBLIC_DIST_DIR is not defined')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
  output: 'export',
  distDir: process.env.NEXT_PUBLIC_DIST_DIR,
  trailingSlash: true,
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  transpilePackages: ['ecm', 'scm', 'rakuten-sans'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.html$/,
      // This is the asset module.
      type: 'asset/source',
    })
    return config
  },
}

export default withMDX(nextConfig)
