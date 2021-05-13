// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Remove before deploying to production
const axios = require("axios");

export default async (req, res) => {
	if (req.method === "GET") {
		const id = req.query.i;

		const url = `${process.env.API_URL}/news?i=${id}`;

		await axios
			.get(url)
			.then((response) => {
				res.setHeader("Cache-Control", "max-age=0, s-maxage=300");
				res.status(200).json(response.data);
			})
			.catch((error) => console.log("error: " + error));
	}
};
