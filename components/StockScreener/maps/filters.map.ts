import {
	ColumnId,
	FilterOption,
} from 'components/StockScreener/screener.types';

export interface FilterProps {
	name: string;
	columnId: ColumnId;
	category: string[];
	options: FilterOption[];
	filterType: 'numeric' | 'stringmatch';
}

export const FiltersMap: FilterProps[] = [
	{
		name: 'Market Cap',
		columnId: 'm',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Any', value: 'Any' },
			{ name: 'Mega-Cap: 200B+', value: 'over-200B' },
			{ name: 'Large-Cap: 10-200B', value: 'between-10B-200B' },
			{ name: 'Mid-Cap: 10-20B', value: 'between-2B-10B' },
			{ name: 'Small-Cap: 300M-20B', value: 'between-300M-2B' },
			{ name: 'Micro-Cap: Under 300M', value: 'under-300M' },
		],
	},
	{
		name: 'PE Ratio',
		columnId: 'pe',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Forward PE',
		columnId: 'fpe',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Exchange',
		columnId: 'exchange',
		category: ['Company'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Any', value: 'Any' },
			{ name: 'NASDAQ', value: 'NASDAQ' },
			{ name: 'NYSE', value: 'NYSE' },
			{ name: 'NYSE AMERICAN', value: 'NYSEAMERICAN' },
		],
	},
	{
		name: 'Industry',
		columnId: 'i',
		category: ['Popular', 'Company'],
		filterType: 'stringmatch',
		options: [],
	},
	{
		name: 'Sector',
		columnId: 'sector',
		category: ['Popular', 'Company'],
		filterType: 'stringmatch',
		options: [],
	},
	{
		name: 'Country',
		columnId: 'country',
		category: ['Company'],
		filterType: 'stringmatch',
		options: [],
	},
	{
		name: 'Stock Price',
		columnId: 'pe',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Price Change',
		columnId: 'pe',
		category: ['Popular'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Volume',
		columnId: 'pe',
		category: ['Popular'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Dividend Yield',
		columnId: 'dy',
		category: ['Popular', 'Dividends'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Analyst Rating',
		columnId: 'ar',
		category: ['Popular', 'Analysts'],
		filterType: 'stringmatch',
		options: [],
	},
	{
		name: 'Price Target',
		columnId: 'pt',
		category: ['Popular', 'Analysts'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Revenue',
		columnId: 'revenue',
		category: ['Financials', 'Popular'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'Net Income',
		columnId: 'netIncome',
		category: ['Financials'],
		filterType: 'numeric',
		options: [],
	},
	{
		name: 'EPS',
		columnId: 'eps',
		category: ['Financials'],
		filterType: 'numeric',
		options: [],
	},
];
