import { FilterValue } from 'components/StockScreener/screener.types';

/**
 * Turn a filter into a short value that can be used as a label
 * @param {string} value the string that carries the filtering properties
 * @param {FilterValue} filter the properties of the filter
 * @return {string}
 */
export function createLabelFromString(
	value: string,
	filter?: FilterValue
): string {
	if (value === 'notzero') {
		return 'Not Zero';
	}

	// Split the string
	const explode = value.split('-');

	// First bit is the "compare" value
	const compare = explode[0];

	// Second bit is the "first" value
	let first = explode[1] as string;
	first = first?.replace('X', '-');

	// Third bit is the "second" value
	let second = explode[2] as string;

	// Append percentage
	if (filter?.numberType === 'percentage') {
		if (second) {
			second += '%';
		} else {
			first += '%';
		}
	}

	switch (compare) {
		case 'over':
			return `Over ${first}`;

		case 'under':
			return `Under ${first}`;

		case 'between':
			return `${first || ''}-${second || ''}`;

		case 'exactly':
			return `Exactly ${first}`;

		case 'future':
			return `Next ${first}`;

		case 'today':
			return 'Today';

		case 'yesterday':
			return 'Yesterday';

		case 'tomorrow':
			return 'Tomorrow';

		case 'this':
			return first === 'year' ? 'This Year' : 'This Month';

		case 'last':
			return first === 'year' ? 'Last Year' : 'Last Month';

		default:
			return value;
	}
}
