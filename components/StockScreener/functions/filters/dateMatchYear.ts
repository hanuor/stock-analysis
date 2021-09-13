import { ColumnId, SingleStock } from 'components/StockScreener/screener.types';

export function dateMatchYear(
	stock: SingleStock,
	columnId: ColumnId,
	filter: string
) {
	// Explode the filter value string to get the individiaul items
	const filterBits = filter.split('-');
	const compare = filterBits[0] ?? null;
	const firstValue = filterBits[1] ?? null;

	// Format the values before comparing
	const value = stock[columnId];

	// If there is no compare, or no value, then return false
	if (!compare || !firstValue || !value) {
		return false;
	}

	// Get the current year
	const current = new Date().getFullYear();

	// Four comparison types: this, last, over, under
	switch (compare) {
		case 'this':
			return Number(value) === current;

		case 'last':
			return Number(value) === current - 1;

		case 'over':
			return current - Number(value) > Number(firstValue);

		case 'under':
			return current - Number(value) < Number(firstValue);
	}

	return false;
}
