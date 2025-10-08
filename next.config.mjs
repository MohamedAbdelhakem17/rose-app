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

export default nextConfig;
