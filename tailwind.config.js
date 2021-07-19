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
			colors: {
				blue: {
					brand_sharp: 'rgba(44, 98, 136)', // from old site
					brand_light: 'rgba(60, 125, 212)', // test later
					sharp: 'rgba(1, 90, 210, 1)',
					link: 'rgb(30, 115, 190, 1)',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
