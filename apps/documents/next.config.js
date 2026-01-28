import mdx from '@next/mdx'

const withMDX = mdx()

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  transpilePackages: ['ecm', 'scm', 'module-navi'],
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
