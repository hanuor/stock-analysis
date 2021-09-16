import { ColumnId, SingleStock } from 'components/StockScreener/screener.types';
import { getFilterFromString } from './getFilterFromString';

export function numericMatch(
	stock: SingleStock,
	columnId: ColumnId,
	filter: string
) {
	// Explode the filter value string to get the individiaul items
	const { compare, first, second } = getFilterFromString(filter);

	// If there is no compare, or no value, then return false
	if (!stock || !compare || !first) {
		return false;
	}

	// Format the values before comparing
	const value = stock[columnId];

	// Three comparison types: over, under and between
	switch (compare) {
		case 'over':
			return value > first;

		case 'under':
			return value < first;

		case 'between':
			if (second) {
				return value > first && value < second;
			}
	}

	return false;
}
