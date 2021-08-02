import { Quote } from 'types/Quote';

export interface Info {
	id: number;
	symbol: string;
	ticker: string;
	name: string;
	type: string;
	nameFull: string;
	exchange: string;
	quote: Quote;
	fiscalYear: string;
	currency: string;
	state: string;
	daysSince?: number;
	archived: boolean;
	ipoInfo?: IpoInfo | null;
	exceptions: {
		hideRatios: boolean;
		hideChart: boolean;
	};
}

export interface IpoInfo {
	ipoDate: string;
	ipoPrice: string;
	ipoPriceLow: string;
	ipoPriceHigh: string;
	ipoPriceNotice: string;
	notice: string;
	ipoExchange: string;
}
