import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        'background-pulse': 'background-pulse 1s cubic-bezier(.25, .1, .25, 1) 2',
        'scale': 'scale 0.5s cubic-bezier(0, 0, 0.2, 0.2) 1',
      },
      keyframes: {
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'background-pulse': {
          'to': { backgroundColor: '#f7f9e0' }
        },
        'scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    }
  },
  plugins: [],
}
export default config
