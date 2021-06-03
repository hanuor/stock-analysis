const axios = require('axios');

export default async (req, res) => {
	if (req.method === 'GET') {
		const url = `${
			process.env.API_URL || 'https://stockanalysis.com/wp-json/sa'
		}/search/`;

		await axios
			.get(url)
			.then((response) => {
				res.setHeader('Cache-Control', 'max-age=0, s-maxage=600');
				res.status(200).json(response.data);
			})
			.catch((error) => console.log('error: ' + error));
	}
};
