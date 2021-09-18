import { screenerState } from 'components/StockScreener/screener.state';
import { ColumnId, FilterType, NumberType } from '../screener.types';
import { isFilterSelected } from './isFilterSelected';

/**
 * Hook to organize and simplify functions that modify the screener filters
 * @return {functions} The functions to modify the screener filters
 */
export function useModifyFilters() {
	const filters = screenerState((state) => state.filters);
	const addFilter = screenerState((state) => state.addFilter);
	const removeFilter = screenerState((state) => state.removeFilter);
	const setShowColumns = screenerState((state) => state.setShowColumns);
	const filteredColumns = screenerState((state) => state.filteredColumns);
	const addFilteredColumn = screenerState((state) => state.addFilteredColumn);
	const removeFilteredColumn = screenerState(
		(state) => state.removeFilteredColumn
	);
	const resultsMenu = screenerState((state) => state.resultsMenu);

	// Add a filter
	function add(
		columnId: ColumnId,
		name: string,
		value: string,
		filterType: FilterType,
		numberType?: NumberType
	) {
		// If filter is already selected, remove the filter first
		if (isFilterSelected(columnId, filters)) {
			remove(columnId);
		}

		// Add the column ID to the filtered columns
		if (!filteredColumns.includes(columnId)) {
			addFilteredColumn(columnId);
		}

		// Add the filter
		addFilter({
			columnId,
			name,
			value,
			filterType,
			numberType,
		});

		// If viewing the filtered columns, force them to update right away
		if (resultsMenu === 'Filtered') {
			const newColumns = [...filteredColumns]; // Need to copy the array in order for state to update
			newColumns.push(columnId);
			setShowColumns(newColumns);
		}
	}

	// Remove a filter
	function remove(columnId: ColumnId) {
		removeFilter(columnId);

		// Remove the column from the filtered columns
		if (columnId !== 'm') {
			removeFilteredColumn(columnId);

			// If viewing the filtered columns, force them to update right away
			if (resultsMenu === 'Filtered') {
				const newColumns = filteredColumns.filter((c) => c !== columnId);
				setShowColumns(newColumns);
			}
		}
	}

	return { add, remove };
}
