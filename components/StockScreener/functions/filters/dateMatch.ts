import { ColumnId, SingleStock } from 'components/StockScreener/screener.types';

function changeDate(date: Date, abbr: string) {
	let str = abbr;

	if (abbr.includes('D')) {
		str = str.replace('D', '');
		date.setDate(date.getDate() - Number(str));
	}

	if (abbr.includes('M')) {
		str = str.replace('M', '');
		date.setMonth(date.getMonth() - Number(str));
	}

	console.log(date);
	return date;
}

export function dateMatch(
	stock: SingleStock,
	columnId: ColumnId,
	filter: string
) {
	// Explode the filter value string to get the individiaul items
	const filterBits = filter.split('-');
	const compare = filterBits[0] ?? null;
	const firstValue = filterBits[1] ?? null;

	// Check if the date exists in the data
	const raw = stock[columnId];
	if (!raw) {
		return false;
	}

	// Format the values before comparing
	const value = new Date(raw);

	// If there is no compare, or no value, then return false
	if (!compare || !firstValue || !value) {
		return false;
	}

	// Get the current datetime
	const now = new Date();
	const year = new Date().getFullYear();

	// Four comparison types: this, last, over, under
	switch (compare) {
		case 'today':
			// If the value is today, return true
			return value.getDate() === now.getDate();

		case 'yesterday':
			// If the value is yesterday, return true
			return value.getDate() === now.getDate() - 1;

		case 'this':
			return value.getFullYear() === year;

		case 'last':
			return value.getFullYear() === year - 1;

		case 'under':
			// If the value is under the first value, return true
			return value.getTime() > changeDate(now, firstValue).getTime();
	}

	return false;
}
