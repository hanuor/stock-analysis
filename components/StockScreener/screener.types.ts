export type ColumnId =
	| 's'
	| 'n'
	| 'm'
	| 'p'
	| 'c'
	| 'i'
	| 'v'
	| 'pe'
	| 'exchange'
	| 'sector'
	| 'country'
	| 'currency'
	| 'dy'
	| 'fpe'
	| 'revenue'
	| 'netincome'
	| 'eps'
	| 'analysts'
	| 'pt';

export type SingleStock = {
	// eslint-disable-next-line no-unused-vars
	[key in ColumnId]: string;
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

export type FilterValue = {
	column: ColumnId;
	value: string;
};
