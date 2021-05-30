// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: 'jit',
	purge: {
		content: [
			'./pages/**/*.{js,ts,jsx,tsx}',
			'./components/**/*.{js,ts,jsx,tsx}',
			'./functions/**/*.{js,ts,jsx,tsx}',
			'./data/**/*.{js,ts,jsx,tsx}',
		],
		options: {
			safelist: [
				'border-gray-300',
				'bg-blue-400',
				'max-w-md',
				'my-20',
				'gap-3',
				'block',
				'hidden',
			],
		},
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
		},
		screens: {
			xs: '350px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extend: {
			gridTemplateColumns: {
				sidebar: '1fr 336px',
				overview: '1fr 1fr 3fr',
				news: '1fr 2fr',
			},
			fontFamily: {
				/* sans: ["Open Sans", ...defaultTheme.fontFamily.sans], */
				/* sans: ["Roboto", ...defaultTheme.fontFamily.sans], */
				/* sans: ["Inter", ...defaultTheme.fontFamily.sans], */
				/* sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans], */
			},
			colors: {
				blue: {
					brand: 'rgba(59, 130, 220, 1)',
					sharp: 'rgba(1, 90, 210, 1)',
					link: 'rgb(30, 115, 190, 1)',
				},
			},
		} /* ,
		fontSize: {
			small: ".95rem",
		}, */,
	},
	plugins: [require('@tailwindcss/typography')],
};
