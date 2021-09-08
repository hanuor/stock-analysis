import { SingleStock, ColumnId, FilterValue } from './screener.types';

// Format and shorten a number and append B for billion, M for million
export function abbreviate(num: number, formatter: Intl.NumberFormat) {
	if (num > 1000000000) {
		return formatter.format(num / 1000000000) + 'B';
	} else if (num > 1000000) {
		return formatter.format(num / 1000000) + 'M';
	} else {
		return formatter.format(num);
	}
}

// Format a number
export const formatNum = (num: number, formatter: Intl.NumberFormat) => {
	return formatter.format(num);
};

// Merge a new data column with the existing columns
export function mergeColumns(
	existing: SingleStock[],
	newColumns: SingleStock[],
	columnId: ColumnId
): any {
	const combined: any = existing.map((stock: SingleStock) => {
		const newStock = newColumns.find((newStock: SingleStock) => {
			return stock.s === newStock.s;
		});
		if (newStock) {
			return { ...stock, [columnId]: newStock[columnId] };
		} else {
			return;
		}
	});

	return combined;
}

// Execute the filtering of the items in the filters array
export function filterItems(data: SingleStock[], filters: FilterValue[]) {
	// If no filters, return the data
	if (filters.length === 0) {
		return data;
	}

	// Loop through the filters to see if they match
	const filtered = data.filter((stock: SingleStock) => {
		let matched = false;
		filters.filter((filter: FilterValue) => {
			if (stock[filter.column] === filter.value) {
				matched = true;
			}
		});

		return matched;
	});

	return filtered;
}
