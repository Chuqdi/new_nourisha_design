/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: "https://api-stage.eatnourisha.com/v1/",
    // API_URL: "https://api.eatnourisha.com/v1/",
    STRIPE_PK_TEST: "pk_test_CTdNlDzkd3JhDT8yof3Hdw5B",
  },
};

export default nextConfig;
