export interface HoldingsType {
	count: number;
	list: Holding[];
	top10: number;
	updated: string;
}

export interface Holding {
	no: number;
	symbol: string;
	name: string;
	assets: string;
	shares: string;
}
