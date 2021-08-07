import Axios from 'axios';

const API = process.env.API_URL || 'https://api.stockanalysis.com/wp-json/sa';

export async function getPageData(page: string, symbol: string) {
	const response = await Axios.get(API + `/${page}?symbol=${symbol}`);
	const data = response.data;

	return data;
}

export async function getStockFinancials(page: string, symbol: string) {
	const response = await Axios.get(
		API + `/financials?type=${page}&symbol=${symbol}`
	);
	const data = response.data;

	return data;
}

export async function getNewsData(id: number) {
	const response = await Axios.get(API + `/news?i=${id}`);
	const news = response.data;

	return news;
}

export async function getMarketNews(type: string) {
	const response = await Axios.get(API + `/news?type=${type}`);
	const news = response.data;

	return news;
}

export async function getHomePageData() {
	const response = await Axios.get(API + '/homepage');
	const data = response.data;

	return data;
}

export async function getIpoData(query: string) {
	const response = await Axios.get(API + `/ipos?q=${query}`);
	const data = response.data;

	return data;
}

export async function getActionsData(query: string) {
	const response = await Axios.get(API + `/actions?q=${query}`);
	const data = response.data;

	return data;
}
