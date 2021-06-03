const axios = require('axios');

export default async (req, res) => {
	if (req.method === 'GET') {
		const id = req.query.i;
		const minimal = req.query.m ? true : false;

		let API =
			process.env.API_CHARTS || 'https://stockanalysis.com/wp-json/sa/cch';
		const url = API + `/?i=${id}${minimal && '&m=1'}`;

		await axios
			.get(url)
			.then((response) => {
				res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
				res.status(200).json(response.data);
			})
			.catch((error) => console.log('error: ' + error));
	}
};
