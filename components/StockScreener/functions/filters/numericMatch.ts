import { FilterId, SingleStock } from 'components/StockScreener/screener.types';
import { getFilterFromString } from '../filterString/getFilterFromString';

export function numericMatch(stock: SingleStock, id: FilterId, filter: string) {
	// Explode the filter value string to get the individiaul items
	const { compare, first, second } = getFilterFromString(filter, true);

	// If there is no compare, or no value, then return false
	if (!stock || !compare) {
		return false;
	}

	// Format the values before comparing
	const value = stock[id];

	// Three comparison types: over, under and between
	switch (compare) {
		case 'over':
			if (!first) {
				return true;
			}
			if (Number(first) === 0) {
				return value > first;
			}
			return value >= first;

		case 'under':
			if (!first) {
				return true;
			}
			return value <= first;

		case 'between':
			if (!second) {
				return value >= first;
			}
			if (!first) {
				return value <= second;
			}
			return value >= first && value <= second;

		case 'exactly':
			return value === first;

		case 'notzero':
			return Number(value) !== 0;
	}
}
