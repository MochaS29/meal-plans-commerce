import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rnvowqoqqcrimrybuiea.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.mindfulmealplan.com',
          },
        ],
        destination: 'https://mindfulmealplan.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
