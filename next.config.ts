/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
