import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.inappstory.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
