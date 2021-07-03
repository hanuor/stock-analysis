import Axios from 'axios';

interface Params {
	params: {
		symbol: string;
	};
}

export async function getStockInfo({ params }: Params) {
	const symbol = params.symbol;

	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/stock?symbol=${symbol}`);
	const info = response.data;

	return info;
}

export async function getEtfInfo({ params }: Params) {
	const symbol = params.symbol;

	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/etf?symbol=${symbol}`);
	const info = response.data;

	return info;
}

export async function getPageData(id: number, page: string) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/${page}?i=${id}`);
	const data = response.data;

	return data;
}

export async function getNewsData(id: number) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/news?i=${id}`);
	const news = response.data;

	return news;
}

export async function getMarketNews(type: string) {
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

export async function getIpoData(query: string) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/ipos?q=${query}`);
	const data = response.data;

	return data;
}

export async function getActionsData(query: string) {
	const API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';

	const response = await Axios.get(API + `/actions?q=${query}`);
	const data = response.data;

	return data;
}
