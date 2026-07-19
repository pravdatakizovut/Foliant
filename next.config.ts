import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "udtnstolwjyloxyjoyeg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
