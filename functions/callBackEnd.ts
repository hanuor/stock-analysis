import { getData } from 'functions/API';

const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null;

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

export async function getPageDataFull(page: string, symbol: string) {
	const url = `${page}?symbol=${symbol}&f=${PRO_KEY}`;
	const response = await getData(url);

	if (response.status === 200) {
		return response.data;
	}
	return [];
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

export async function getActionsData(query: string, year?: string) {
	const url = year ? `actions?q=${query}&y=${year}` : `actions?q=${query}`;
	const response = await getData(url);
	return response;
}

export async function getActionsDataFull(query: string, year?: string) {
	const response = await getData(`actions?q=${query}&y=${year}&f=${PRO_KEY}`);
	return response;
}
