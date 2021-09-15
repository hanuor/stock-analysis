import { screenerState } from 'components/StockScreener/screener.state';
import {
	FilterOption,
	ColumnId,
} from 'components/StockScreener/screener.types';

type Props = {
	option: FilterOption;
	columnId: ColumnId;
	type: 'numeric' | 'stringmatch' | 'date' | 'dateYear';
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
			addFilter(id, name, value, type);
			setOpenFilter('');
		}
	}

	return (
		<div>
			<div
				className={`block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-default${
					option.div ? ' border-b border-gray-200 c' : ''
				}`}
				onClick={() => handleSelection(option.name, option.value)}
			>
				{option.name}
			</div>
		</div>
	);
}