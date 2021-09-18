type Column = {
	Header: string;
	accessor: string;
	format?:
		| 'linkSymbol'
		| 'amount'
		| 'align'
		| 'abbreviate'
		| 'format0dec'
		| 'format2dec'
		| 'changePcColor'
		| 'percentage';
};

export const COLUMNS_MAP: Column[] = [
	{
		Header: 'Symbol',
		accessor: 's',
		format: 'linkSymbol',
	},
	{
		Header: 'Company Name',
		accessor: 'n',
	},
	{
		Header: 'Enterprise Value',
		accessor: 'ev',
	},
	{
		Header: 'Sector',
		accessor: 'se',
	},
	{
		Header: 'Industry',
		accessor: 'i',
	},
	{
		Header: 'Market Cap',
		accessor: 'm',
		format: 'abbreviate',
	},
	{
		Header: 'Exchange',
		accessor: 'exchange',
	},
	{
		Header: 'Price',
		accessor: 'p',
		format: 'amount',
	},
	{
		Header: 'Change',
		accessor: 'c',
		format: 'changePcColor',
	},
	{
		Header: 'Volume',
		accessor: 'v',
		format: 'format0dec',
	},
	{
		Header: 'PE Ratio',
		accessor: 'pe',
		format: 'format2dec',
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Employees',
		accessor: 'employees',
		format: 'format0dec',
	},
	{
		Header: 'Founded',
		accessor: 'founded',
		format: 'align',
	},
	{
		Header: 'IPO Date',
		accessor: 'ipoDate',
		format: 'align',
	},
	{
		Header: 'Revenue',
		accessor: 'revenue',
	},
	{
		Header: 'Net Income',
		accessor: 'netIncome',
	},
	{
		Header: 'EPS',
		accessor: 'eps',
	},
	{
		Header: 'Forward PE',
		accessor: 'fpe',
	},
	{
		Header: 'Price / Sales',
		accessor: 'ps',
	},
	{
		Header: 'Price / Book',
		accessor: 'pb',
	},
	{
		Header: 'Price / FCF',
		accessor: 'pfcf',
	},
	{
		Header: 'Analyst Ratings',
		accessor: 'ar',
		format: 'align',
	},
	{
		Header: 'Count',
		accessor: 'ac',
		format: 'align',
	},
	{
		Header: 'Price Target',
		accessor: 'pt',
		format: 'align',
	},
	{
		Header: 'Difference (%)',
		accessor: 'ptc',
		format: 'changePcColor',
	},
	{
		Header: 'Dividend',
		accessor: 'div',
	},
	{
		Header: 'Yield (%)',
		accessor: 'dy',
	},
	{
		Header: 'Payout Ratio',
		accessor: 'pr',
	},
	{
		Header: 'Growth (1Y)',
		accessor: 'dg',
	},
	{
		Header: 'Revenue Growth (1Y)',
		accessor: 'revenueGrowth',
		format: 'percentage',
	},
	{
		Header: 'Gross Profit',
		accessor: 'grossProfit',
	},
	{
		Header: 'Op. Income',
		accessor: 'operatingIncome',
	},
	{
		Header: 'Net Income',
		accessor: 'netIncome',
	},
	{
		Header: 'Net Income Growth',
		accessor: 'netIncomeGrowth',
		format: 'percentage',
	},
	{
		Header: 'EPS',
		accessor: 'eps',
	},
	{
		Header: 'EPS Growth',
		accessor: 'epsGrowth',
		format: 'percentage',
	},
	{
		Header: 'EBIT',
		accessor: 'ebit',
	},
	{
		Header: 'EBITDA',
		accessor: 'ebitda',
	},
	{
		Header: 'Op. Cash Flow',
		accessor: 'ocf',
	},
	{
		Header: 'Free Cash Flow',
		accessor: 'fcf',
	},
	{
		Header: 'FCF Growth',
		accessor: 'fcfGrowth',
		format: 'percentage',
	},
	{
		Header: 'FCF / Share',
		accessor: 'fcfps',
	},
	{
		Header: 'Total Cash',
		accessor: 'cash',
	},
	{
		Header: 'Total Debt',
		accessor: 'debt',
	},
	{
		Header: 'Net Cash / Debt',
		accessor: 'netCash',
	},
	{
		Header: 'Net Cash Growth',
		accessor: 'netCashGrowth',
		format: 'percentage',
	},
	{
		Header: 'Gross Margin',
		accessor: 'grossMargin',
		format: 'percentage',
	},
	{
		Header: 'Operating Margin',
		accessor: 'operatingMargin',
		format: 'percentage',
	},
	{
		Header: 'Profit Margin',
		accessor: 'profitMargin',
		format: 'percentage',
	},
	{
		Header: 'FCF Margin',
		accessor: 'fcfMargin',
		format: 'percentage',
	},
	{
		Header: 'EBITDA Margin',
		accessor: 'ebitdaMargin',
		format: 'percentage',
	},
	{
		Header: 'EBIT Margin',
		accessor: 'ebitMargin',
		format: 'percentage',
	},
	{
		Header: 'P/FCF Ratio',
		accessor: 'pfcf',
	},
	{
		Header: 'PEG Ratio',
		accessor: 'peg',
	},
	{
		Header: 'EV/Sales',
		accessor: 'evSales',
	},
	{
		Header: 'EV/Earnings',
		accessor: 'evEarnings',
	},
	{
		Header: 'EV/Ebitda',
		accessor: 'evEbitda',
	},
	{
		Header: 'EV/Ebit',
		accessor: 'evEbit',
	},
	{
		Header: 'EV/FCF',
		accessor: 'evFcf',
	},
	{
		Header: 'Earnings Yield',
		accessor: 'earningsYield',
	},
	{
		Header: 'FCF Yield',
		accessor: 'fcfYield',
	},
];
