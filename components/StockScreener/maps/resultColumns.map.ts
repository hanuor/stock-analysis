import { ColumnsMap } from 'components/StockScreener/screener.types';

export const resultColumns: ColumnsMap = {
	Filtered: [],
	General: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'],
	Company: [
		's',
		'n',
		'se',
		'i',
		'country',
		'exchange',
		'employees',
		'founded',
		'ipoDate',
	],
	Financials: ['s', 'n', 'm', 'revenue', 'netIncome', 'eps'],
	Valuation: ['s', 'n', 'm', 'ev', 'pe', 'fpe', 'ps', 'pb', 'pfcf'],
	Dividends: ['s', 'n', 'm', 'div', 'dy', 'pr', 'dg'],
	Analysts: ['s', 'n', 'm', 'ar', 'ac', 'pt', 'ptc'],
	Custom: ['s', 'n'],
};
