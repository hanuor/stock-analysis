import { ColumnId, FilterValue } from 'components/StockScreener/screener.types';

// Check if the selected filter is in the list of filters
export function isFilterSelected(id: ColumnId, filters: FilterValue[]) {
	if (filters.length === 0) return false;
	const findFilter = filters.find((filter) => filter.columnId === id);
	return findFilter ? findFilter.name : false;
}
