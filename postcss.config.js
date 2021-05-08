module.exports = {
	plugins: [
		'tailwindcss',
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009'
				},
				stage: 3,
				features: {
					'custom-properties': false
				}
			}
		]
	]
}

/* module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	}
} */

/* module.exports = {
	plugins: [
		require('postcss-import'),
		require('tailwindcss'),
		require('autoprefixer')
	]
} */

/* module.exports = {
	"plugins": [
		"postcss-import",
		"tailwindcss",
		"autoprefixer",
		"postcss-flexbugs-fixes",
		[
			"postcss-preset-env",
			{
				"autoprefixer": {
					"flexbox": "no-2009"
				},
				"stage": 3,
				"features": {
					"custom-properties": false
				}
			}
		]
	]
} */