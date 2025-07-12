import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en-GB/home",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
