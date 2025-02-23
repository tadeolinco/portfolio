import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dtnlx5fjl/**",
      },
      {
        protocol: "https",
        hostname: "a.ltrbxd.com",
        port: "",
        pathname: "/logos/**",
      },
    ],
  },
};

export default nextConfig;
