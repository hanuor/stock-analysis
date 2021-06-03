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

	let API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/symbol?symbol=${symbol}`);
	const info = response.data;

	return info;
}

export async function getPageData(id, page) {
	let API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/${page}?i=${id}`);
	const data = response.data;

	return data;
}

export async function getStockNews(id) {
	let API = process.env.API_URL || 'localhost:3001';

	const response = await Axios.get(API + `/api/news?i=${id}`);
	const news = response.data;

	return news;
}

export async function getHomePageData() {
	let API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + '/homepage');
	const data = response.data;

	return data;
}
