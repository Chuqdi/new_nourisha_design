/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  env: {
    // API_URL: 'https://api-stage.eatnourisha.com/v1/',
    API_URL: "https://api.eatnourisha.com/v1/",
    STRIPE_PK_TEST: "pk_test_CTdNlDzkd3JhDT8yof3Hdw5B",
  },
};

export default nextConfig;
