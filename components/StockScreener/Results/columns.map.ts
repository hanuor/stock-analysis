import { ColumnsMap } from 'components/StockScreener/screener.types';

export const columnsMap: ColumnsMap = {
	Filtered: [],
	General: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'],
	Company: [
		's',
		'n',
		'sector',
		'i',
		'country',
		'exchange',
		'employees',
		'founded',
		'ipoDate',
	],
	Financials: ['s', 'n', 'm', 'revenue', 'netIncome', 'eps'],
	Valuation: ['s', 'n', 'm', 'ev', 'pe', 'fpe', 'ps', 'pb', 'pfcf'],
	Dividends: [],
	Analysts: [],
	Custom: [],
};
