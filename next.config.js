/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Only use basePath when explicitly building for GitHub Pages
  basePath: process.env.GITHUB_PAGES === 'true' ? '/waitlist' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

