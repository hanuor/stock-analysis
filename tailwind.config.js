/* const defaultTheme = require("tailwindcss/defaultTheme"); */

module.exports = {
	mode: "jit",
	purge: {
		content: [
			"./pages/**/*.{js,ts,jsx,tsx}",
			"./components/**/*.{js,ts,jsx,tsx}",
		],
		options: {
			safelist: [
				"border-gray-300",
				"bg-blue-400",
				"max-w-md",
				"my-20",
				"gap-3",
			],
		},
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
		},
		extend: {
			gridTemplateColumns: {
				sidebar: "1fr 336px",
				overview: "1fr 1fr 3fr",
				news: "1fr 2fr",
			},
			fontFamily: {
				/* sans: ["Roboto", ...defaultTheme.fontFamily.sans], */
				/* sans: ["Inter", ...defaultTheme.fontFamily.sans], */
			},
		} /* ,
		fontSize: {
			small: ".95rem",
		}, */,
	},

	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
