/** @type {import('next').NextConfig} */

const pathPrefix =
  process.env.NODE_ENV === "production" ? "/sorcery-tcg-playtest" : "";

console.log("Environment:", process.env.NODE_ENV);
const nextConfig = {
  output: "export",
  assetPrefix: pathPrefix,
  env: {
    pathPrefix,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
