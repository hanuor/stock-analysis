const withTM = require('next-transpile-modules')([
	'd3-format',
	'd3-array',
	'd3-time-format',
	'd3-scale',
	'd3-color',
	'd3-interpolate',
	'd3-time',
	'internmap',
	'd3-shape',
	'd3-path',
]); // pass the modules you would like to see transpiled

module.exports = withTM({
	trailingSlash: true,
	images: {
		domains: ['storage.googleapis.com'],
	},
});
