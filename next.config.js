/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Firebase Storage images allow
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "blinkup-b42bd.firebasestorage.app",
      },
    ],
  },

  // Optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Environment values
  env: {
    NEXT_PUBLIC_APP_NAME: "BlinkUp",
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
