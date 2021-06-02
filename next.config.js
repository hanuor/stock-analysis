const withTM = require("next-transpile-modules")([
	"d3-format",
	"d3-time-format",
	"react-financial-charts",
	"@react-financial-charts/annotations",
	"@react-financial-charts/core",
	"@react-financial-charts/axes",
	"@react-financial-charts/coordinates",
	"@react-financial-charts/indicators",
	"@react-financial-charts/interactive",
	"@react-financial-charts/scales",
	"@react-financial-charts/series",
	"@react-financial-charts/tooltip",
	"@react-financial-charts/utils",
]); // pass the modules you would like to see transpiled

module.exports = withTM({
	future: {
		webpack5: false, // you want to keep using Webpack 4
	},

	trailingSlash: true,
	images: {
		domains: ["cdn.snapi.dev"],
	},
});
