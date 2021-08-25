module.exports = {
	trailingSlash: true,
	experimental: {
		scrollRestoration: true,
	},
	async redirects() {
		return [
			{
				source: '/ipos/2021-list/',
				destination: '/ipos/2021/',
				permanent: true,
			},
			{
				source: '/ipos/2020-list/',
				destination: '/ipos/2020/',
				permanent: true,
			},
			{
				source: '/ipos/2019-list/',
				destination: '/ipos/2019/',
				permanent: true,
			},
			{
				source: '/ipos/2020-list/%20',
				destination: '/ipos/2020/',
				permanent: true,
			},
		];
	},
};
