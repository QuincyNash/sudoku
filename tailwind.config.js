const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				md: {
					raw: "(min-width: 725px), (orientation: landscape)",
				},
				"login-wrap": "483px",
				"signup-wrap": "513px",
			},
			spacing: {
				"grid-sm": "var(--grid-sm-width)",
				"grid-lg": "var(--grid-lg-width)",
			},
			width: {
				"controls-sm": "var(--controls-sm-width)",
				"controls-lg": "var(--controls-lg-width)",
			},
			height: {
				"controls-sm": "var(--controls-sm-height)",
				"controls-lg": "var(--controls-lg-height)",
			},
			colors: {
				"modal-light": "rgba(0, 0, 0, 0.3)",
				"modal-dark": "rgba(60, 60, 60, 0.7)",
				"form-red": "#d93025",
				"form-light": "#f8f9fd",
				"cell-error": "rgba(179, 58, 58, 0.5)",
				cage: "rgba(0, 126, 255, 0.7)",
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
				primary: [
					"Roboto",
					"Oxygen",
					"Ubuntu",
					"Cantarell",
					"Fira Sans",
					"Droid Sans",
					"Helvetica Neue",
					"sans-serif",
				],
				sudoku: ["Tahoma", "Verdana", "sans-serif"],
				cursive: ["Lobster", "cursive"],
				courgette: ["Courgette", "cursive"],
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("hover-focus", ["&:hover", "&:focus-visible"]);
		}),
	],
};
