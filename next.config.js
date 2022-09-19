/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
]

module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  images: {
    domains: [
      "img.jiaxin.im",
      "static.jiaxin.im",
      "web-platforms.sfo2.digitaloceanspaces.com",
      "gateway.storjshare.io",
    ],
    minimumCacheTTL: 86400,
  },
  reactStrictMode: true,
}
