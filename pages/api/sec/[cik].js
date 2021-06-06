const axios = require('axios');
const parseString = require('xml2js').parseString;

export default async (req, res) => {
	if (req.method === 'GET') {
		const cik = req.query.cik;
		const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&count=10&output=atom`;

		await axios
			.get(url, { timeout: 3000 })
			.then((response) => {
				res.setHeader('Cache-Control', 'max-age=0, s-maxage=43200');
				parseString(response.data, function (err, result) {
					res.status(200).json(result.feed.entry);
				});
			})
			.catch((error) => {
				console.log('error: ' + error);
				res.status(500).end('There was an error');
			});
	}
};
