export type ColumnId = {
	columnId: 's' | 'n' | 'm' | 'p' | 'c' | 'i' | 'v' | 'pe' | 'exchange';
};
export type SingleStock = {
	[key: string]: string;
	// s: string;
	// ColumnId: string;
	// s: string;
	// n?: string;
	// m?: string;
	// p?: number;
	// c?: string;
	// i?: string;
	// v?: number;
	// pe?: number;
	// exchange?: number;
};

export interface ScreenerData {
	stocks: SingleStock[];
}

export type CellString = {
	cell: {
		value: string;
	};
};

export type CellNumber = {
	cell: {
		value: number;
	};
};
