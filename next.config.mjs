/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.OUTPUT_STANDALONE === 'true' ? 'standalone' : undefined,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};

export default nextConfig;
