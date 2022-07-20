/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : [
      "thrangra.sirv.com"
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
