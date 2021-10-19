import {
	SingleStock,
	FilterValue,
} from 'components/StockScreener/screener.types';
import { numericMatch } from './filters/numericMatch';
import { dateMatch } from './filters/dateMatch';
import { numericRangeMatch } from './filters/numericRangeMatch';

// Execute the filtering of the items in the filters array
export function filterItems(data: SingleStock[], filters: FilterValue[]) {
	// Count the number of filters
	const filterCount = filters.length;

	// If no filters, return the data
	if (filterCount === 0) {
		return data;
	}

	// Loop through the filters and filter the data
	// on each pass, the "filtered" array gets smaller so that it doesn't
	// process the entire collection on each pass
	let filtered = data;

	for (let i = 0; i < filterCount; i++) {
		const filter = filters[i];

		filtered = filtered.filter((stock: SingleStock) => {
			let matched = false;

			// String match
			if (filter.filterType === 'stringmatch') {
				if (stock[filter.id] === filter.value) {
					matched = true;
				}
			}

			// Numeric
			else if (filter.filterType === 'numeric') {
				matched = numericMatch(stock, filter.id, filter.value);
			}

			// Date
			else if (filter.filterType === 'date') {
				matched = dateMatch(stock, filter.id, filter.value);
			}

			// Numeric Range
			else if (filter.filterType === 'numericRange') {
				matched = numericRangeMatch(stock, filter.id, filter.value);
			}

			return matched;
		});
	}

	return filtered;
}
