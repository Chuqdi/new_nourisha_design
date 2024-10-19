import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		spacing: {
  			'6.25': '6.25rem',
  			'1.25': '1.25rem'
  		},
  		colors: {
  			'primary-orange-900': '#FE7E00',
  			'black-900': '#030517',
  			background: 'hsl(var(--background))',
  			background2: '#DEF54C',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'primary-Green-900': '#7DB83A',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			NewSpiritRegular: ["NewSpiritRegular", ...fontFamily.sans],
  			NewSpiritMedium: ["NewSpiritMedium", ...fontFamily.sans],
  			NewSpiritBold: ["NewSpiritBold", ...fontFamily.sans],
  			NewSpiritHeavy: ["NewSpiritHeavy", ...fontFamily.sans],
  			inter: ["var(--inter)", ...fontFamily.sans],
  			food_wookolos: ["food_wookolos", ...fontFamily.sans]
  		},
  		boxShadow: {
  			navbar: '0px 5px 24px 0px rgba(0, 0, 0, 0.03)',
  			btn: '0px 4px 12px 0px rgba(0, 0, 0, 0.10)',
  			cartItem: '0px 4px 12px 0px rgba(0, 0, 0, 0.05)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
