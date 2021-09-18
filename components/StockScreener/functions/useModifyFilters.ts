import { screenerState } from 'components/StockScreener/screener.state';
import { FilterId, FilterType, NumberType } from '../screener.types';
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
		id: FilterId,
		name: string,
		value: string,
		filterType: FilterType,
		numberType?: NumberType
	) {
		// If filter is already selected, remove the filter first
		if (isFilterSelected(id, filters)) {
			remove(id);
		}

		// Add the column ID to the filtered columns
		if (!filteredColumns.includes(id)) {
			addFilteredColumn(id);
		}

		// Add the filter
		addFilter({
			id,
			name,
			value,
			filterType,
			numberType,
		});

		// If viewing the filtered columns, force them to update right away
		if (resultsMenu === 'Filtered') {
			const newColumns = [...filteredColumns]; // Need to copy the array in order for state to update
			newColumns.push(id);
			setShowColumns(newColumns);
		}
	}

	// Remove a filter
	function remove(id: FilterId) {
		removeFilter(id);

		// Remove the column from the filtered columns
		if (id !== 'm') {
			removeFilteredColumn(id);

			// If viewing the filtered columns, force them to update right away
			if (resultsMenu === 'Filtered') {
				const newColumns = filteredColumns.filter((c) => c !== id);
				setShowColumns(newColumns);
			}
		}
	}

	return { add, remove };
}
