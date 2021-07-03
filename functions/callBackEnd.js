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

export async function getData(path) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';
	const resp = await Axios.get(API + path);
	return resp.data;
}

export async function getStockInfo({ params }) {
	const symbol = params.symbol;

	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/stock?symbol=${symbol}`);
	const info = response.data;

	return info;
}

export async function getEtfInfo({ params }) {
	const symbol = params.symbol;

	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/etf?symbol=${symbol}`);
	const info = response.data;

	return info;
}

export async function getPageData(id, page) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/${page}?i=${id}`);
	const data = response.data;

	return data;
}

export async function getNewsData(id) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/news?i=${id}`);
	const news = response.data;

	return news;
}

export async function getMarketNews(type) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/news?type=${type}`);
	const news = response.data;

	return news;
}

export async function getHomePageData() {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + '/homepage');
	const data = response.data;

	return data;
}

export async function getIpoData(query) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/ipos?q=${query}`);
	const data = response.data;

	return data;
}

export async function getActionsData(query) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/actions?q=${query}`);
	const data = response.data;

	return data;
}
