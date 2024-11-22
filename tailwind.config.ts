import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))", 
        },
        light: {
			primaryText: "#2D3748",
			secondaryText: "#4A5568",
			header: "#1A202C",
			link: "#2B6CB0",
			buttonBg: "#2B6CB0",
			buttonText: "#FFFFFF",
			cardBg: "#FFFFFF",
			inputBg: "#EDF2F7",
			errorText: "#E53E3E",
			errorBg: "#FED7D7",
			navbarBg: "#F7FAFC",
			footerBg: "#F7FAFC",
			bodyBg: "#F7FAFC", // Background color for body in light mode
		  },
		  // Dark Theme Colors
		  dark: {
			primaryText: "#E2E8F0",
			secondaryText: "#A0AEC0",
			header: "#F7FAFC",
			link: "#63B3ED",
			buttonBg: "#63B3ED",
			buttonText: "#1A202C",
			cardBg: "#2D3748",
			inputBg: "#4A5568",
			errorText: "#FEB2B2",
			errorBg: "#742A2A",
			navbarBg: "#1A202C",
			footerBg: "#2D3748",
			bodyBg: "#101214", // Background color for body in dark mode
		  },
		  // Accent Colors
		  myaccent: {
			primary: "#3182CE",
			secondary: "#38B2AC",
			success: "#48BB78",
			warning: "#ECC94B",
			danger: "#E53E3E",
		  },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate"),require("@tailwindcss/typography")]
} satisfies Config
