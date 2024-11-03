import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    env: {
        BACKEND_IP_ADDRESS: process.env.BACKEND_IP_ADDRESS,
        LIVE_UPDATE_URL: process.env.LIVE_UPDATE_URL,
    },
    output: 'export',
};
export default nextConfig;