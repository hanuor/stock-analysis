module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
			padding: "1.5rem"
		},
		extend: {
			gridTemplateColumns: {
				"sidebar": "1fr 300px"
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
