type Column = {
	Header: string;
	accessor: string;
	format?:
		| 'linkSymbol'
		| 'abbreviate'
		| 'format0dec'
		| 'format2dec'
		| 'changePcColor';
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
		Header: 'Market Cap',
		accessor: 'm',
		format: 'abbreviate',
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
		Header: 'Exchange',
		accessor: 'exchange',
	},
	{
		Header: 'Price',
		accessor: 'p',
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
	},
	{
		Header: 'Ipo Date',
		accessor: 'ipoDate',
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
	},
	{
		Header: 'Count',
		accessor: 'ac',
	},
	{
		Header: 'Price Target',
		accessor: 'pt',
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
];
