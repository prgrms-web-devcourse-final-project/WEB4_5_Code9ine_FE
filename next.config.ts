/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kogtlmeeslyrdhjfakbj.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
