/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				brand: {
					50: "#f5fbff",
					100: "#e6f6ff",
					200: "#bfeaff",
					300: "#8fdcff",
					400: "#57c9ff",
					500: "#1eaaff",
					600: "#188ae6",
					700: "#1168b3",
					800: "#0b497f",
					900: "#05284d"
				}
			},
			fontFamily: {
				sans: ["Geist", "Inter", "ui-sans-serif", "system-ui", "Helvetica", "Arial", "sans-serif"]
			}
		}
	},
	plugins: []
};