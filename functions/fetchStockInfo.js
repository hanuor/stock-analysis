// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Remove before going live
import Axios from 'axios';

export function getStockUrls() {
	// Array of objects with the params key and the slugname-value key value pair.
	const paths = [
		{
			params: {
				symbol: 'aapl',
			},
		},
	];

	return paths;
}

export async function getStockInfo({ params }) {
	const symbol = params.symbol;
	const infoApi = process.env.API_URL + `/symbol?symbol=${symbol}`;

	const response = await Axios.get(infoApi);
	const info = response.data;

	return info;
}

export async function getPageData(id, page) {
	const pageApi = process.env.API_URL + `/${page}?i=${id}`;

	const response = await Axios.get(pageApi);
	const data = response.data;

	return data;
}

export async function getStockNews(id) {
	const newsApi = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/news?i=${id}`;

	const response = await Axios.get(newsApi);
	const news = response.data;

	return news;
}
