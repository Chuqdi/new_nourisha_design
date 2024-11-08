/** @type {import('next').NextConfig} */
const nextConfig = {
  onError: (error) => {
    if (process.env.NEXT_IGNORE_BUILD_ERROR === "true") {
      console.warn("Ignoring build error:", error);
      return;
    }
    throw error;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: "https://api-stage.eatnourisha.com/v1/",
    // API_URL: "https://api.eatnourisha.com/v1/",
    // STRIPE_PK_TEST:"pk_live_51Nf7mzDnJeZQ4C8V274zAVzORq0lBkJoeCkJaRcM0JHhQfvXwqldRAvKdLT0hLgC6HEsd7hpULiSEq7n9bFuM53F00ODObrjWe"
    STRIPE_PK_TEST: "pk_test_CTdNlDzkd3JhDT8yof3Hdw5B",
    
  },
};

export default nextConfig;
