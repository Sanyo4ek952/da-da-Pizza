import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.inappstory.ru'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
      },
    ],
  },
};

export default nextConfig;
