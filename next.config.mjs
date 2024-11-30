/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/about_us",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/contact_us",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/bulk_meals",
        destination: "/bulk-meals",
        permanent: true,
      },
      {
        source: "/food_box",
        destination: "/food-box",
        permanent: true,
      },
      {
        source: "/forgot_password",
        destination: "/forgot-password",
        permanent: true,
      },
      {
        source: "/meal_plans",
        destination: "/meal-plans",
        permanent: true,
      },
      {
        source: "/party_plan",
        destination: "/party-meal-plans",
        permanent: true,
      },
      {
        source: "/privacy_policy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/single_meal",
        destination: "/single-meal",
        permanent: true,
      },
      {
        source: "/terms_and_conditions",
        destination: "/terms-and-conditions",
        permanent: true,
      },
    ];
  },
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
    // API_URL: "https://api-stage.eatnourisha.com/v1/",
    // API_URL: "https://api.eatnourisha.com/v1/",
    API_URL:"http://localhost:8080/v1/",
    // STRIPE_PK_TEST:"pk_live_51Nf7mzDnJeZQ4C8V274zAVzORq0lBkJoeCkJaRcM0JHhQfvXwqldRAvKdLT0hLgC6HEsd7hpULiSEq7n9bFuM53F00ODObrjWe",
    STRIPE_PK_TEST: "pk_test_CTdNlDzkd3JhDT8yof3Hdw5B",
    NEXT_PUBLIC_BASE_URL: "https://www.eatnourisha.com",
  },
};

export default nextConfig;
