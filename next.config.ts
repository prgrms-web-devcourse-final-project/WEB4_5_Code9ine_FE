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
  async rewrites() {
    return [
      {
        // '/api/'로 시작하는 모든 요청을 잡습니다.
        source: '/api/:path*',
        // 잡은 요청을 모두 '/api/proxy/'로 보냅니다.
        destination: '/api/proxy/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
