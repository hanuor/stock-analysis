import Axios from "axios";

export function getStockUrls() {
	// Array of objects with the params key and the slugname-value key value pair.
	const paths = [
		{
			params: {
				symbol: "aapl",
			},
		},
		{
			params: {
				symbol: "msft",
			},
		},
	];

	return paths;
}

export async function getStockInfo({ params }) {
	const symbol = params.symbol;
	const infoApi = process.env.API_URL + `/symbol?type=stock&symbol=${symbol}`;

	const response = await Axios.get(infoApi);
	const info = response.data;

	return info;
}

export async function getPageData({ params }, page) {
	const symbol = params.symbol;
	const pageApi = process.env.API_URL + `/${page}?symbol=${symbol}`;

	const response = await Axios.get(pageApi);
	const data = response.data;

	return data;
}
