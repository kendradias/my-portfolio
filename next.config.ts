import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // These settings are crucial for proper static site generation
  trailingSlash: true,
  assetPrefix: '/',
  experimental: {
  },
};


export default nextConfig;