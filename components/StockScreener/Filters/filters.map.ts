import { ColumnId } from 'components/StockScreener/screener.types';

export interface FilterProps {
	name: string;
	columnId: ColumnId;
	category: string;
	options: string[];
	filter?: any;
}

export const FiltersMap: FilterProps[] = [
	{
		name: 'Exchange',
		columnId: 'exchange',
		category: 'Company',
		options: ['NASDAQ', 'NYSE', 'NYSEAMERICAN'],
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
		name: 'Currency',
		columnId: 'currency',
		category: 'Company',
		options: [],
	},
	{
		name: 'Market Cap',
		columnId: 'm',
		category: 'General',
		options: [],
	},
	{
		name: 'Dividend Yield',
		columnId: 'dy',
		category: 'Dividends',
		options: [],
	},
	{
		name: 'PE Ratio',
		columnId: 'pe',
		category: 'Valuation',
		options: [],
	},
	{
		name: 'Forward PE',
		columnId: 'fpe',
		category: 'Valuation',
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
	{
		name: 'Analysts',
		columnId: 'analysts',
		category: 'Analysts',
		options: [],
	},
	{
		name: 'Price Target',
		columnId: 'pt',
		category: 'Analysts',
		options: [],
	},
];
