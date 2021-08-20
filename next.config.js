const withTM = require('next-transpile-modules')(['chartjs-react']);

module.exports = withTM({
	trailingSlash: true,
});
