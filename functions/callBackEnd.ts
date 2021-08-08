import { getData } from 'functions/API';

interface Response {
	status: number;
	data: any;
}

export function respond(response: Response, revalidate: number) {
	if (response.status === 200) {
		return {
			props: response.data,
			revalidate: revalidate,
		};
	} else {
		return response.data;
	}
}

export async function getPageData(page: string, symbol: string, reval: number) {
	const response = await getData(`${page}?symbol=${symbol}`);
	return respond(response, reval);
}

export async function getStockFinancials(
	page: string,
	symbol: string,
	reval: number
) {
	const response = await getData(`financials?type=${page}&symbol=${symbol}`);
	return respond(response, reval);
}

export async function getNewsData(id: number) {
	const response = await getData(`news?i=${id}`);
	return response;
}

export async function getMarketNews(type: string) {
	const response = await getData(`news?type=${type}`);
	return response;
}

export async function getHomePageData() {
	const response = await getData('homepage');
	return response;
}

export async function getIpoData(query: string) {
	const response = await getData(`ipos?q=${query}`);
	return response;
}

export async function getActionsData(query: string) {
	const response = await getData(`actions?q=${query}`);
	return response;
}
