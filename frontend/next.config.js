/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['trustedsignalsvip.com', 'images.pexels.com'],
  },
}

module.exports = nextConfig