import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        market: "0 24px 70px rgba(20, 83, 45, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
