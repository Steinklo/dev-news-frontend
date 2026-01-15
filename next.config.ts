import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    // Proxy API calls to backend (works in Azure SWA hybrid mode)
    const apiDestination =
      process.env.API_URL ?? "http://localhost:7020/api";

    return [
      {
        source: "/api/:path*",
        destination: `${apiDestination}/:path*`,
      },
    ];
  },
};

export default nextConfig;
