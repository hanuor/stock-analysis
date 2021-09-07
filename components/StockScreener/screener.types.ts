export type SingleStock = {
	s: string;
	n: string;
	cls?: string;
	aum?: number;
	ind?: string;
	mcap?: number;
};

export interface ScreenerData {
	stocks: SingleStock[];
}

export type CellString = {
	cell: {
		value: string;
	};
};
