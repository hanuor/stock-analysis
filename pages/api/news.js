const axios = require('axios');

export default async (req, res) => {
	if (req.method === 'GET') {
		const id = req.query.i;

		let API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';
		const url = API + `/news?i=${id}`;

		await axios
			.get(url)
			.then((response) => {
				res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
				res.status(200).json(response.data);
			})
			.catch((error) => console.log('error: ' + error));
	}
};
