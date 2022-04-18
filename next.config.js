const { config } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      // ...

      test: /\.worker\.js$/,
      use: { loader: "worker-loader" },
    });
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
