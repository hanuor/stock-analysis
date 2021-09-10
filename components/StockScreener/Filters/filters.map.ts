import { ColumnId } from 'components/StockScreener/screener.types';

export interface FilterProps {
	name: string;
	columnId: ColumnId;
	category: string;
	options: string[];
	filterType?: string;
}

export const FiltersMap: FilterProps[] = [
	{
		name: 'Market Cap',
		columnId: 'm',
		category: 'General',
		options: [
			'Any',
			'Mega-Cap: 200B+',
			'Large-Cap: 10-200B',
			'Mid-Cap: 2-10B',
		],
	},
	{
		name: 'PE Ratio',
		columnId: 'pe',
		category: 'General',
		options: [],
	},
	{
		name: 'Forward PE',
		columnId: 'fpe',
		category: 'General',
		options: [],
	},
	{
		name: 'Exchange',
		columnId: 'exchange',
		category: 'General',
		filterType: 'match',
		options: ['Any', 'NASDAQ', 'NYSE', 'NYSEAMERICAN'],
	},
	{
		name: 'Industry',
		columnId: 'i',
		category: 'General',
		options: [],
	},
	{
		name: 'Sector',
		columnId: 'sector',
		category: 'General',
		options: [],
	},
	{
		name: 'Country',
		columnId: 'country',
		category: 'General',
		options: [],
	},
	{
		name: 'Stock Price',
		columnId: 'pe',
		category: 'General',
		options: [],
	},
	{
		name: 'Price Change',
		columnId: 'pe',
		category: 'General',
		options: [],
	},
	{
		name: 'Volume',
		columnId: 'pe',
		category: 'General',
		options: [],
	},
	{
		name: 'Dividend Yield',
		columnId: 'dy',
		category: 'General',
		options: [],
	},
	{
		name: 'Analyst Rating',
		columnId: 'analysts',
		category: 'General',
		options: [],
	},
	{
		name: 'Price Target',
		columnId: 'pt',
		category: 'General',
		options: [],
	},
	{
		name: 'Revenue',
		columnId: 'revenue',
		category: 'Financials',
		options: [],
	},
	{
		name: 'Net Income',
		columnId: 'netincome',
		category: 'Financials',
		options: [],
	},
	{
		name: 'Earnings Per Share',
		columnId: 'eps',
		category: 'Financials',
		options: [],
	},
];
