const withTM = require('next-transpile-modules')([
	'd3-format',
	'd3-array',
	'd3-time-format',
	'internmap',
	'd3-scale',
	'd3-dsv',
	'react-financial-charts',
	'@react-financial-charts/annotations',
	'@react-financial-charts/core',
	'@react-financial-charts/axes',
	'@react-financial-charts/coordinates',
	'@react-financial-charts/indicators',
	'@react-financial-charts/interactive',
	'@react-financial-charts/scales',
	'@react-financial-charts/series',
	'@react-financial-charts/tooltip',
	'@react-financial-charts/utils',
]); // pass the modules you would like to see transpiled

module.exports = withTM({
	trailingSlash: true,
	images: {
		domains: ['storage.googleapis.com'],
	},
});
