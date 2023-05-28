/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "wembleypark.com", "th.bing.com"],
  },
};

module.exports = nextConfig
