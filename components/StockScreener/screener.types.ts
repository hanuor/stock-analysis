// All possible columns
// The IDs are shortened to minimize data payload size
export type ColumnId =
	| 's' // symbol
	| 'n' // company name
	| 'm' // market cap
	| 'p' // stock price
	| 'c' // stock price change (%)
	| 'i' // industry
	| 'v' // volume
	| 'pe' // pe ratio
	| 'se' // se
	| 'exchange' // exchange
	| 'country' // country
	| 'employees' // employees
	| 'founded' // founded year
	| 'ipoDate' // ipo date
	| 'revenue' // revenue
	| 'netIncome' // net income
	| 'eps' // earnings per share
	| 'ev' // enterprise value
	| 'fpe' // forward PE
	| 'ps' // price to sales ratio
	| 'pb' // price to book ratio
	| 'pfcf' // price to free cash flow ratio
	| 'div' // dividend amount
	| 'dy' // dividend yield
	| 'pr' // payout ratio
	| 'dg' // dividend growth
	| 'ar' // analyst ratings
	| 'ac' // analyst rating count
	| 'pt' // price target
	| 'ptc'; // price target change (%)

// Results columns
export type ColumnName =
	| 'Filtered'
	| 'General'
	| 'Company'
	| 'Financials'
	| 'Valuation'
	| 'Dividends'
	| 'Analysts'
	| 'Custom';

export type ColumnsMap = {
	// eslint-disable-next-line no-unused-vars
	[key in ColumnName]: ColumnId[];
};

export type SingleStock = {
	// eslint-disable-next-line no-unused-vars
	[key in ColumnId]: string;
};

export type ScreenerData = {
	stocks: SingleStock[];
};

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

export type FilterOption = {
	name: string;
	value: string;
	div?: boolean; // Set true to add a divider in the dropdown
};

export type FilterValue = {
	columnId: ColumnId;
	name: string;
	value: string;
	filterType: 'numeric' | 'stringmatch' | 'date' | 'dateYear';
};
