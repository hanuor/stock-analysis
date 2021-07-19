export interface HoldingsI {
	count: number;
	list: Holding[];
	top10: number;
	updated: string;
}

type Holding = {
	no: number;
	symbol: string;
	name: string;
	assets: string;
	shares: string;
};
