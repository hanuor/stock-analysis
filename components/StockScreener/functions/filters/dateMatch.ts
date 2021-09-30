import { FilterId, SingleStock } from 'components/StockScreener/screener.types';

function changeDate(date: Date, abbr: string) {
	let str = abbr;

	if (abbr.includes('D')) {
		str = str.replace('D', '');
		date.setTime(date.getTime() - Number(str) * 24 * 60 * 60 * 1000);
	}

	if (abbr.includes('M')) {
		str = str.replace('M', '');
		date.setMonth(date.getMonth() - Number(str));
	}

	if (abbr.includes('Y')) {
		str = str.replace('Y', '');
		date.setFullYear(date.getFullYear() - Number(str));
	}

	return date;
}

export function dateMatch(stock: SingleStock, id: FilterId, filter: string) {
	// Explode the filter value string to get the individual items
	const filterBits = filter.split('-');
	const compare = filterBits[0] ?? null;
	const first = filterBits[1] ?? null;

	// Check if the date exists in the data
	const raw = stock[id];
	if (!raw) {
		return false;
	}

	// Format the values before comparing
	const value = new Date(raw);

	// If there is no compare, or no value, then return false
	if (!compare || !value) {
		return false;
	}

	// Get the current datetime
	const now = new Date();
	const year = new Date().getFullYear();
	const month = new Date().getMonth();

	// Four comparison types: this, last, over, under
	switch (compare) {
		case 'today':
			return (
				value.getDate() === now.getDate() &&
				value.getMonth() == now.getMonth() &&
				value.getFullYear() == now.getFullYear()
			);

		case 'yesterday':
			const yesterday = new Date(now);
			yesterday.setDate(yesterday.getDate() - 1);
			return value.toDateString() === yesterday.toDateString();

		case 'tomorrow':
			const tomorrow = new Date(now);
			tomorrow.setDate(tomorrow.getDate() + 1);
			return value.toDateString() === tomorrow.toDateString();

		case 'this':
			return first === 'year'
				? value.getFullYear() === year
				: value.getFullYear() === year && value.getMonth() === month;

		case 'last':
			return first === 'year'
				? value.getFullYear() === year - 1
				: value.getFullYear() === year && value.getMonth() === month - 1;

		case 'under':
			// If the value is under the first value, return true
			return value.getTime() > changeDate(now, first).getTime();

		case 'over':
			// If the value is under the first value, return true
			return value.getTime() < changeDate(now, first).getTime();

		case 'future':
			return (
				value.getTime() > now.getTime() &&
				value.getTime() < changeDate(now, `-${first}`).getTime()
			);

		case 'past':
			return (
				value.getTime() < now.getTime() &&
				value.getTime() > changeDate(now, `${first}`).getTime()
			);
	}
	return false;
}
