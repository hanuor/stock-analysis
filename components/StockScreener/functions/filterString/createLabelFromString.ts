import { ComparisonOption } from 'components/StockScreener/screener.types';

/**
 * Turn a filter into a short value that can be used as a label
 * @param {string} string the string that carries the filtering properties
 * @return {string}
 */
export function createLabelFromString(string: string): string {
	// Split the string
	const explode = string.split('-');

	// First bit is the "compare" value
	const compare = explode[0] as ComparisonOption;

	// Second bit is the "first" value
	const first = explode[1] as string;

	// Third bit is the "second" value
	const second = explode[2] as string;

	switch (compare) {
		case 'over':
			return `Over ${first}`;

		case 'under':
			return `Under ${first}`;

		case 'between':
			return `${first || ''}-${second || ''}`;

		case 'exactly':
			return `Exactly ${first}`;

		default:
			return string;
	}
}
