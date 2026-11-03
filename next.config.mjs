/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.BUILD_STANDALONE ? { output: 'standalone' } : {}),
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};

export default nextConfig;
