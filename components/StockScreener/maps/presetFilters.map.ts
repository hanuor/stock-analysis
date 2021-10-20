import { FilterId } from '../screener.types';

type Single = {
	id: FilterId;
	value: string;
};

export type PresetFilter = {
	name: string;
	filters: Single[];
};

export const PresetFiltersStocks: PresetFilter[] = [
	{
		name: 'Dividend Growth',
		filters: [
			{ id: 'm', value: 'over-1B' },
			{ id: 'dy', value: 'over-1' },
			{ id: 'dg', value: 'over-0.5' },
			{ id: 'pr', value: 'under-60' },
			{ id: 'revenueGrowth', value: 'over-3' },
		],
	},
	{
		name: 'Strong Cash Flow',
		filters: [
			{ id: 'm', value: 'over-300M' },
			{ id: 'ocf', value: 'over-100M' },
			{ id: 'fcfMargin', value: 'over-10' },
			{ id: 'fcfGrowth', value: 'over-10' },
		],
	},
	{
		name: 'IPO This Year',
		filters: [
			{ id: 'ipoDate', value: 'this-year' },
			{ id: 'spac', value: 'No' },
		],
	},
	{
		name: 'IPO Last Year',
		filters: [
			{ id: 'ipoDate', value: 'last-year' },
			{ id: 'spac', value: 'No' },
		],
	},
	{
		name: 'Earnings Soon',
		filters: [{ id: 'earningsDate', value: 'future-7D' }],
	},
];

export const PresetFiltersIpos: PresetFilter[] = [
	{
		name: 'Exclude SPACs',
		filters: [{ id: 'spac', value: 'No' }],
	},
	{
		name: 'Has Revenue',
		filters: [{ id: 'revenue', value: 'over-0' }],
	},
	{
		name: 'Profitable',
		filters: [
			{ id: 'revenue', value: 'over-0' },
			{ id: 'netIncome', value: 'over-0' },
		],
	},
	{
		name: 'FCF Positive',
		filters: [
			{ id: 'revenue', value: 'over-0' },
			{ id: 'fcf', value: 'over-0' },
		],
	},
];
