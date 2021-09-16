import { screenerState } from 'components/StockScreener/screener.state';
import {
	FilterOption,
	ColumnId,
	FilterType,
} from 'components/StockScreener/screener.types';

type Props = {
	option: FilterOption;
	columnId: ColumnId;
	type: FilterType;
	active: string | false;
};

export function PresetChoice({ option, columnId, type, active }: Props) {
	const addFilteredColumn = screenerState((state) => state.addFilteredColumn);
	const removeFilteredColumn = screenerState(
		(state) => state.removeFilteredColumn
	);
	const addFilter = screenerState((state) => state.addFilter);
	const removeFilter = screenerState((state) => state.removeFilter);
	const resultsMenu = screenerState((state) => state.resultsMenu);
	const setShowColumns = screenerState((state) => state.setShowColumns);
	const filteredColumns = screenerState((state) => state.filteredColumns);
	const setOpenFilter = screenerState((state) => state.setOpenFilter);

	const id = columnId;

	function handleSelection(name: string, value: string) {
		if (id) {
			// If changing an active filter, first remove the existing filter
			if (active) {
				removeFilter(id);
				removeFilteredColumn(id);
			}
			// If viewing the filtered columns, make them update right away
			if (resultsMenu === 'Filtered') {
				const newColumns = [...filteredColumns]; // Need to copy the array in order for state to update
				newColumns.push(id);
				setShowColumns(newColumns);
			}
			// Add new filters
			addFilteredColumn(id);
			addFilter({ columnId, name, value, filterType: type });
			setOpenFilter('');
		}
	}

	return (
		<div className="border-b border-gray-100 last:border-0">
			<div
				className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-default"
				onClick={() => handleSelection(option.name, option.value)}
			>
				{option.name}
			</div>
		</div>
	);
}
