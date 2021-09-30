import { ColumnsMap } from 'components/StockScreener/screener.types';

export const resultColumns: ColumnsMap = {
	Filtered: [],
	General: ['s', 'n', 'm', 'se', 'p', 'c', 'v', 'pe'],
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
	Financials: [
		's',
		'n',
		'm',
		'revenue',
		'operatingIncome',
		'netIncome',
		'fcf',
		'eps',
	],
	Valuation: ['s', 'n', 'm', 'ev', 'pe', 'fpe', 'ps', 'pb', 'pfcf'],
	Dividends: ['s', 'n', 'm', 'dps', 'dy', 'pr', 'dg'],
	Analysts: ['s', 'n', 'm', 'ar', 'ac', 'p', 'pt', 'ptc'],
	Custom: ['s', 'n', 'm'],
};
