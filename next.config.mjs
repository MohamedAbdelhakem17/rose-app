import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'flower.elevateegy.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flower.elevateegy.com',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
