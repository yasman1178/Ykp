/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Enable TypeScript support
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable ESLint during builds
    ignoreDuringBuilds: false,
  },
  images: {
    // Optimize images for Egyptian graphics and product photos
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issue
  },
  // Internationalization support for Arabic and English
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push({
        apply(compiler) {
          const createChunksLink = () => {
            try {
              const fs = require('fs');
              const path = require('path');
              const serverDir = path.join(process.cwd(), '.next', 'server');
              const chunksDir = path.join(serverDir, 'chunks');
              const symlinkPath = path.join(chunksDir, 'vendor-chunks');
              if (!fs.existsSync(chunksDir)) {
                fs.mkdirSync(chunksDir, { recursive: true });
              }
              if (!fs.existsSync(symlinkPath)) {
                fs.symlinkSync('../vendor-chunks', symlinkPath, 'dir');
              }
            } catch (e) {}
          };
          compiler.hooks.afterEmit.tap('EnsureVendorChunksPlugin', createChunksLink);
          compiler.hooks.done.tap('EnsureVendorChunksPlugin', createChunksLink);
        }
      });
    }
    return config;
  },
}

module.exports = nextConfig
