// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Remove before deploying to production
const axios = require("axios");

export default async (req, res) => {
	if (req.method === "GET") {
		const id = req.query.i;
		const minimal = req.query.m ? true : false;
		var period = req.query.p;
		var time = req.query.t;

		if (!period) {
			period = "";
		}
		if (!time) {
			time = "";
		}

		console.log(time + period + minimal + id);
		const url = `${process.env.API_CHARTS}?i=${id}${period && "&r=" + period}
		${time && "&p=" + time}${minimal && "&m=1"}`;

		await axios
			.get(url)
			.then((response) => {
				res.setHeader("Cache-Control", "max-age=0, s-maxage=300");
				res.status(200).json(response.data);
			})
			.catch((error) => console.log("error: " + error));
	}
};
