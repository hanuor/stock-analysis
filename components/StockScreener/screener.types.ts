// All possible filters
// The IDs are shortened to minimize data payload size
export type FilterId =
	| 's' // Symbol
	| 'n' // Name
	| 'm' // Market Cap
	| 'ev' // Enterprise Value
	| 'p' // Stock Price
	| 'pe' // PE Ratio
	| 'fpe' // Forward PE
	| 'exchange' // Exchange
	| 'dy' // Dividend Yield
	| 'se' // Sector
	| 'i' // Industry
	| 'c' // Price Change 1D
	| 'ch1y' // Price Change 1Y
	| 'v' // Volume
	| 'ar' // Analyst Rating
	| 'ac' // Analyst Count
	| 'pt' // Price Target
	| 'ptc' // Price Target (%)
	| 'country' // Country
	| 'employees' // Employees
	| 'founded' // Founded
	| 'ipoDate' // IPO Date
	| 'revenue' // Revenue
	| 'revenueGrowth' // Revenue Growth
	| 'grossProfit' // Gross Profit
	| 'operatingIncome' // Op. Income
	| 'netIncome' // Net Income
	| 'netIncomeGrowth' // Net Inc. Growth
	| 'eps' // EPS
	| 'epsGrowth' // EPS Growth
	| 'ebit' // EBIT
	| 'ebitda' // EBITDA
	| 'ocf' // Op. Cash Flow
	| 'fcf' // Free Cash Flow
	| 'fcfGrowth' // FCF Growth
	| 'fcfps' // FCF / Share
	| 'cash' // Total Cash
	| 'debt' // Total Debt
	| 'netCash' // Net Cash / Debt
	| 'netCashGrowth' // Net Cash Growth
	| 'grossMargin' // Gross Margin
	| 'operatingMargin' // Operating Margin
	| 'profitMargin' // Profit Margin
	| 'fcfMargin' // FCF Margin
	| 'ebitdaMargin' // EBITDA Margin
	| 'ebitMargin' // EBIT Margin
	| 'ps' // PS Ratio
	| 'pb' // PB Ratio
	| 'pfcf' // P/FCF Ratio
	| 'peg' // PEG Ratio
	| 'evSales' // EV/Sales
	| 'evEarnings' // EV/Earnings
	| 'evEbitda' // EV/EBITDA
	| 'evEbit' // EV/EBIT
	| 'evFcf' // EV/FCF
	| 'earningsYield' // Earnings Yield
	| 'fcfYield' // FCF Yield
	| 'dps' // Dividend ($)
	| 'dg' // Div. Growth
	| 'pr' // Payout Ratio
	| 'buybackYield' // Buyback Yield
	| 'totalReturn' // Total Return
	| 'averageVolume' // Average Volume
	| 'beta' // Beta (1Y)
	| 'shortFloat' // Short % Float
	| 'shortShares' // Short % Shares
	| 'shortRatio' // Short Ratio
	| 'sharesOut' // Shares Out
	| 'float' // Float
	| 'sharesYoY' // Shares Ch. (YoY)
	| 'sharesQoQ' // Shares Ch. (QoQ)
	| 'sharesInsiders' // Shares Insiders
	| 'sharesInstitutions' // Shares Institut.
	| 'earningsDate' // Earnings Date
	| 'exDivDate' // Ex-Div Date
	| 'nextDivDate' // Next Ex-Div
	| 'roe' // Return on Equity
	| 'roa' // Return on Assets
	| 'roic' // Return on Capital
	| 'revPerEmployee' // Rev / Employee
	| 'profitPerEmployee' // Prof. / Employee
	| 'assetTurnover' // Asset Turnover
	| 'inventoryTurnover' // Inv. Turnover
	| 'currentRatio' // Current Ratio
	| 'quickRatio' // Quick Ratio
	| 'debtEquity' // Debt / Equity
	| 'debtEbitda' // Debt / EBITDA
	| 'debtFcf' // Debt / FCF
	| 'taxRate' // Eff. Tax Rate
	| 'taxByRevenue' // Tax / Revenue
	| 'equity' // Shareh. Equity
	| 'workingCapital' // Working Capital
	| 'ls' // Last Stock Split
	| 'splitDate'; // Last Split Date

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

export type FilterIpoId =
	| 's' // Symbol
	| 'n' // Name
	| 'm' // Market Cap
	| 'p' // Stock Price
	| 'c' // Price Change
	| 'v' // Volume
	| 'se' // Sector
	| 'pe'; // PE Ratio

export type ColumnsMap = {
	// eslint-disable-next-line no-unused-vars
	[key in ColumnName]: FilterId[];
};

export type SingleStock = {
	// eslint-disable-next-line no-unused-vars
	[key in FilterId]: string;
};

export type SingleIPO = {
	// eslint-disable-next-line no-unused-vars
	[key in FilterIpoId]: string;
};

export type SingleDataPoint = string[];

export type ScreenerData = {
	stocks: {
		count: number;
		data: SingleIPO[];
	};
};

export type IPOScreenerData = {
	ipos: {
		count: number;
		data: SingleIPO[];
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
