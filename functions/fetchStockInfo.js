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
	const infoApi =
		(process.env.API_URL || 'https://stockanalysis.com/wp-json/sa') +
		`/symbol?symbol=${symbol}`;

	const response = await Axios.get(infoApi);
	const info = response.data;

	return info;
}

export async function getPageData(id, page) {
	const pageApi =
		(process.env.API_URL || 'https://stockanalysis.com/wp-json/sa') +
		`/${page}?i=${id}`;

	const response = await Axios.get(pageApi);
	const data = response.data;

	return data;
}

export async function getStockNews(id) {
	const newsApi = `${
		process.env.NEXT_PUBLIC_VERCEL_URL ||
		'https://stockanalysis.com/wp-json/sa'
	}/api/news?i=${id}`;

	const response = await Axios.get(newsApi);
	const news = response.data;

	return news;
}

export async function getHomePageData() {
	const api =
		(process.env.API_URL || 'https://stockanalysis.com/wp-json/sa') +
		'/homepage';

	const response = await Axios.get(api);
	const data = response.data;

	return data;
}
