/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		"hidden",
		"visible",
		"bg-opacity-0",
		"bg-opacity-30",
		"outline-[#FF0000]",
		{
			pattern: /bg-(primary|secondary)-.+/,
		},
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#24FF62",
					200: "#20E658",
					300: "#1DCC4E",
					400: "#19B344",
					500: "#15993B",
					600: "#128031",
					700: "#0E6627",
					800: "#0B4D1D",
					900: "#073314",
				},
				secondary: {
					100: "#19AFFF",
					200: "#179DE6",
					300: "#148CCC",
					400: "#127AB3",
					500: "#0F6999",
					600: "#0D5780",
					700: "#0A4666",
					800: "#08344D",
					900: "#052333",
				},
			},
			fontFamily: {
				sudoku: ["Tahoma", "Verdana", "sans-serif"],
			},
		},
	},
	plugins: [],
};
