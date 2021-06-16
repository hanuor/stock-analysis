// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: {
		content: [
			'./pages/**/*.{js,ts,jsx,tsx}',
			'./components/**/*.{js,ts,jsx,tsx}',
			'./functions/**/*.{js,ts,jsx,tsx}',
			'./data/**/*.{js,ts,jsx,tsx}',
			'./content/**/*.{js,ts,jsx,tsx,mdx}',
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
			bp: '380px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1200px',
			'2xl': '1536px',
		},
		extend: {
			gridTemplateColumns: {
				sidebar: '1fr 300px',
				sidebar_wide: '1fr 336px',
				overview: '1fr 1fr 3fr',
				news: '1fr 2fr',
			},
			fontSize: {
				smaller: ['0.95rem', '1.35rem'],
				small: ['0.9rem', '1.3rem'],
				tiny: ['0.8rem', '1.15rem'],
			},
			fontFamily: {
				/* sans: ["Open Sans", ...defaultTheme.fontFamily.sans], */
				/* sans: ["Roboto", ...defaultTheme.fontFamily.sans], */
				/* system: [...defaultTheme.fontFamily.sans],
				sans: ['Inter var', ...defaultTheme.fontFamily.sans], */
				/* sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans], */
			},
			colors: {
				blue: {
					/* brand: 'rgba(59, 130, 220, 1)', */
					/* brand: 'rgba(15, 115, 177)', */
					brand_sharp: 'rgba(44, 98, 136)', // from old site
					// brand_light: 'rgba(30, 118, 181)', // test later
					brand_light: 'rgba(60, 125, 212)', // test later
					/* brand: 'rgba(45, 129, 189)', */ // test later

					/* brand: 'rgba(41, 122, 187)', */
					sharp: 'rgba(1, 90, 210, 1)',
					link: 'rgb(30, 115, 190, 1)',
				},
			},
		} /* ,
		fontSize: {
			small: ".95rem",
		}, */,
	},
	plugins: [require('@tailwindcss/forms')],
};
