// All possible filters
// The IDs are shortened to minimize data payload size
export type FilterId = string;
// | 's' // symbol
// | 'n' // company name
// | 'm' // market cap
// | 'p' // stock price
// | 'c' // stock price change (%)
// | 'i' // industry
// | 'v' // volume
// | 'pe' // pe ratio
// | 'se' // se
// | 'exchange' // exchange
// | 'country' // country
// | 'employees' // employees
// | 'founded' // founded year
// | 'ipoDate' // ipo date
// | 'ev' // enterprise value
// | 'fpe' // forward PE
// | 'ps' // price to sales ratio
// | 'pb' // price to book ratio
// | 'pfcf' // price to free cash flow ratio
// | 'div' // dividend amount
// | 'dy' // dividend yield
// | 'pr' // payout ratio
// | 'dg' // dividend growth
// | 'ar' // analyst ratings
// | 'ac' // analyst rating count
// | 'pt' // price target
// | 'ptc' // price target change (%)
// | 'revenue'
// | 'revenueGrowth'
// | 'grossProfit'
// | 'operatingIncome'
// | 'netIncome'
// | 'ebit'
// | 'ebitda'
// | 'eps'
// | 'epsGrowth'
// | 'ocf' // operating cash flow
// | 'fcf' // free cash flow
// | 'fcfGrowth' // free cash flow growth
// | 'fcfps' // free cash flow per share
// | 'cash'
// | 'debt'
// | 'netCash'
// | 'netCashGrowth';

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
	[key in ColumnName]: FilterId[];
};

export type SingleStock = {
	// eslint-disable-next-line no-unused-vars
	[key in FilterId]: string;
};

export type ScreenerData = {
	stocks: {
		count: number;
		data: SingleStock[];
	};
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

export type FilterProps = {
	name: string;
	id: FilterId;
	category: string[];
	options: FilterOption[];
	filterType: 'numeric' | 'stringmatch' | 'date' | 'dateYear';
	numberType?: NumberType;
};

export type FilterOption = {
	name: string;
	value: string;
	div?: boolean; // Set true to add a divider in the dropdown
};

export type FilterValue = {
	id: FilterId;
	name: string;
	value: string;
	filterType: FilterType;
	numberType?: 'percentage';
};

export type FilterObject = {
	compare: ComparisonOption;
	first: string;
	second: string;
};

export type FilterType = 'numeric' | 'stringmatch' | 'date' | 'dateYear';
export type NumberType = 'percentage';
export type ComparisonOption =
	| 'over'
	| 'under'
	| 'between'
	| 'exactly'
	| 'notzero';
