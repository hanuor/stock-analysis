import { screenerState } from 'components/StockScreener/screener.state';
import { FilterProps } from 'components/StockScreener/Filters/filters.map';
import { FilterDropdown } from 'components/StockScreener/Filters/FilterDropdown';
import { getData } from 'functions/API';

export function SingleFilter({ filter }: { filter: FilterProps }) {
	const fetchedColumns = screenerState((state) => state.fetchedColumns);
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn);
	const addDataColumn = screenerState((state) => state.addDataColumn);
	const filterMenu = screenerState((state) => state.filterMenu);

	if (filterMenu !== filter.category && filterMenu !== 'All') {
		return null;
	}

	const id = filter.columnId;

	async function fetchColumn(columnId: string) {
		if (!fetchedColumns.includes(columnId)) {
			addFetchedColumn(id);
			const fetched = await getData(`screener?type=${columnId}`);
			addDataColumn(fetched, id);
		}
	}

	return (
		<>
			<div className="inline-flex items-center justify-between border border-gray-100 px-2 py-1">
				<div>{filter.name}</div>
				<div onMouseEnter={() => fetchColumn(filter.columnId)}>
					<FilterDropdown filter={filter} />
				</div>
			</div>
		</>
	);
}
