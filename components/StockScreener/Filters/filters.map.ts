import { ColumnId } from 'components/StockScreener/screener.types';

interface MapProps {
	name: string;
	columnId: ColumnId;
	options: string[];
	filter?: any;
}

export const GENERAL: MapProps[] = [
	{
		name: 'Exchange',
		columnId: 'exchange',
		options: ['NASDAQ', 'NYSE', 'NYSEAMERICAN'],
		filter: (exchange: string, selected: string) => exchange === selected,
	},
	{
		name: 'Industry',
		columnId: 'i',
		options: [],
	},
	{
		name: 'Sector',
		columnId: 'sector',
		options: [],
	},
	{
		name: 'Country',
		columnId: 'country',
		options: [],
	},
	{
		name: 'Currency',
		columnId: 'currency',
		options: [],
	},
	{
		name: 'Market Cap',
		columnId: 'm',
		options: [],
	},
	{
		name: 'Dividend Yield',
		columnId: 'dy',
		options: [],
	},
	{
		name: 'PE Ratio',
		columnId: 'pe',
		options: [],
	},
	{
		name: 'Forward PE',
		columnId: 'fpe',
		options: [],
	},
	{
		name: 'Revenue',
		columnId: 'revenue',
		options: [],
	},
	{
		name: 'Net Income',
		columnId: 'netincome',
		options: [],
	},
	{
		name: 'Earnings Per Share',
		columnId: 'eps',
		options: [],
	},
	{
		name: 'Analysts',
		columnId: 'analysts',
		options: [],
	},
	{
		name: 'Price Target',
		columnId: 'pt',
		options: [],
	},
];
