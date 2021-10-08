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
	Income: [
		's',
		'n',
		'revenue',
		'grossProfit',
		'operatingIncome',
		'netIncome',
		'eps',
		'ebit',
		'ebitda',
	],
	'Balance Sheet': ['s', 'n', 'cash', 'liabilities', 'debt', 'equity'],
	'Cash Flow': ['s', 'n', 'ocf', 'icf', 'cff', 'ncf', 'capex', 'fcf', 'fcfps'],
};

/*
export const resultIPOColumns: ColumnsMap = {
	Filtered: [],
	General: ['s', 'n', 'm', 'se', 'revenue'],
	Company: [
		's',
		'n',
		'se',
		'i',
		'country',
		'exchange',
		'employees',
		'founded',
	],
	Income: [
		's',
		'n',
		'revenue',
		'grossProfit',
		'operatingIncome',
		'netIncome',
		'eps',
		'ebit',
		'ebitda',
	],
	'Balance Sheet': ['s', 'n', 'cash', 'liabilities', 'debt', 'equity'],
	'Cash Flow': ['s', 'n', 'ocf', 'icf', 'cff', 'ncf', 'capex', 'fcf', 'fcfps'],
	Custom: ['s', 'n', 'm'],
};
*/

export function returnResultColumns(type: string) {
	if (type == 'stock') {
		return resultColumns;
	} else {
		// Change to IPO columns
		resultColumns['General'] = [
			's',
			'n',
			'm',
			'se',
			'ipoPriceRange',
			'ipoDate',
			'revenue',
		];
		resultColumns['Company'] = [
			's',
			'n',
			'se',
			'i',
			'country',
			'exchange',
			'employees',
			'founded',
		];
		return resultColumns;
	}
}
