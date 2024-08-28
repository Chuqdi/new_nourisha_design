import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing:{
        "6.25":"6.25rem",
        "1.25":"1.25rem",
      },
      colors: {
        "primary-orange-900": "#FE7E00",
        "black-900": "#030517",
        background: "#E1F0D0",
        background2: "#DEF54C",
        "primary-Green-900": "#7DB83A",
      },
      fontFamily: {
        NewSpiritRegular: ["NewSpiritRegular", ...fontFamily.sans],
        NewSpiritMedium: ["NewSpiritMedium", ...fontFamily.sans],
        NewSpiritBold: ["NewSpiritBold", ...fontFamily.sans],
        NewSpiritHeavy: ["NewSpiritHeavy", ...fontFamily.sans],
        inter: ["var(--inter)", ...fontFamily.sans],
      },
      boxShadow: {
        navbar: "0px 5px 24px 0px rgba(0, 0, 0, 0.03)",
        btn:"0px 4px 12px 0px rgba(0, 0, 0, 0.10)",
        cartItem:"0px 4px 12px 0px rgba(0, 0, 0, 0.05)"
      },
    },
  },
  plugins: [],
};
export default config;
