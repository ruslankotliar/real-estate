/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/for-sale',
  //       permanent: false,
  //     },
  //   ];
  // },
  images: {
    domains: ['bayut-production.s3.eu-central-1.amazonaws.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
