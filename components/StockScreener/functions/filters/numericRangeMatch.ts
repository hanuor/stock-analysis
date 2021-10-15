import { FilterId, SingleStock } from 'components/StockScreener/screener.types';
import {
	getFilterFromString,
	getPriceRangeFilterFromString,
} from '../filterString/getFilterFromString';

export function numericRangeMatch(
	stock: SingleStock,
	id: FilterId,
	filter: string
) {
	let result;
	if (/^\d+$/.test(filter[0])) {
		result = getPriceRangeFilterFromString(filter);
	} else {
		result = getFilterFromString(filter, true);
	}
	// Explode the filter value string to get the individiaul items
	const { compare, first, second } = result;

	// If there is no compare, or no value, then return false
	if (!stock || !compare) {
		return false;
	}

	// Format the values before comparing

	const splitString = stock[id].split(/\s+/);

	let value;
	if (splitString.length > 1) {
		const firstValue = splitString[0].substring(1);
		const secondValue = splitString[2].substring(1);
		value = { firstValue, secondValue };
	} else {
		const firstValue = splitString[0].substring(1);
		const secondValue = null;
		value = { firstValue, secondValue };
	}
	const { firstValue, secondValue } = value;
	// Three comparison types: over, under and between
	switch (compare) {
		case 'over':
			return (
				Number(firstValue) >= Number(first) ||
				Number(secondValue) > Number(first)
			);
		case 'between':
			if (!secondValue) {
				return (
					Number(firstValue) == Number(first) ||
					Number(firstValue) == Number(second) ||
					(Number(firstValue) < Number(second) &&
						Number(firstValue) > Number(first))
				);
			} else {
				return (
					Number(first) === Number(firstValue) || // First case handles if filter values equal price, on both ends
					Number(first) == Number(secondValue) ||
					Number(second) == Number(secondValue) ||
					Number(second) == Number(firstValue) ||
					(Number(firstValue) < Number(first) && // Second case, checks if the price range envelopes the filter.
						Number(secondValue) > Number(second)) ||
					(Number(firstValue) > Number(first) && // Third case, if either ends of the price fall between the filter range.
						Number(firstValue) < Number(second)) ||
					(Number(secondValue) > Number(first) &&
						Number(secondValue) < Number(second))
				);
			}
		case 'under':
			if (!secondValue) {
				return Number(firstValue) < Number(first);
			} else {
				return (
					Number(firstValue) < Number(first) ||
					Number(secondValue) < Number(first)
				);
			}
		case 'notzero':
			return stock[id] !== 'n/a';

		case 'exactly':
			if (!secondValue) {
				return first == firstValue;
			} else {
				return (
					first == firstValue ||
					first == secondValue ||
					(first > firstValue && first < secondValue)
				);
			}
	}
	return false;
}
