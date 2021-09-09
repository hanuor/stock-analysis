import { screenerState } from 'components/StockScreener/screener.state';
import { ColumnId } from 'components/StockScreener/screener.types';
import { FilterProps } from 'components/StockScreener/Filters/filters.map';
import { getData } from 'functions/API';

export function SingleFilter({ filter }: { filter: FilterProps }) {
	const addDataColumn = screenerState((state) => state.addDataColumn);
	const addColumn = screenerState((state) => state.addColumn);
	const removeColumn = screenerState((state) => state.removeColumn);
	const addFilter = screenerState((state) => state.addFilter);
	const removeFilter = screenerState((state) => state.removeFilter);
	const filterMenu = screenerState((state) => state.filterMenu);

	if (filterMenu !== filter.category && filterMenu !== 'All') {
		return null;
	}

	const id = filter.columnId;

	// Fetch the data for the selected column and add it to the main data array
	async function fetchNewColumn(column: ColumnId, value: string) {
		const fetched = await getData(`screener?type=${column}`);
		addDataColumn(fetched, id);
		addFilter(id, value);
	}

	// React to the select dropdown and add/remove columns
	function handleSelection(e: React.ChangeEvent<HTMLSelectElement>) {
		if (id) {
			if (e.target.value === 'Any') {
				removeColumn(id);
				removeFilter(id);
			} else {
				fetchNewColumn(id, e.target.value);
				addColumn(id);
			}
		}
	}

	return (
		<>
			<div className="inline-flex items-center justify-between border border-gray-100 px-2 py-1">
				<div>{filter.name}</div>
				<div>
					<select
						className="py-1 border-gray-300 rounded"
						onChange={handleSelection}
					>
						<option>Any</option>
						{filter.options &&
							filter.options.map((option) => (
								<option key={option}>{option}</option>
							))}
					</select>
				</div>
			</div>
		</>
	);
}
