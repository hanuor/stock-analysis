import { ColumnId, SingleStock } from 'components/StockScreener/screener.types';

function fillNumber(abbr: string) {
	let str = abbr;
	str = str.replace('B', '000000000');
	str = str.replace('M', '000000');
	return str;
}

export function numericMatch(
	stock: SingleStock,
	columnId: ColumnId,
	filter: string
) {
	// Explode the filter value string to get the individiaul items
	const filterBits = filter.split('-');
	const compare = filterBits[0] ?? null;
	const firstValue = filterBits[1] ?? null;
	const secondValue = filterBits[2] ?? null;

	// If there is no compare, or no value, then return false
	if (!compare || !firstValue) {
		return false;
	}

	// Format the values before comparing
	const value = stock[columnId];
	const first = fillNumber(firstValue);
	const second = secondValue ? fillNumber(secondValue) : null;

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
