/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Always use basePath for GitHub Pages (repository name)
  basePath: process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production' ? '/Anchored' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

