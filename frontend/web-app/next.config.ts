import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // This allows non-secure hostnames
      },
    ],
  },
  output: 'standalone'
};

export default withFlowbiteReact(nextConfig);