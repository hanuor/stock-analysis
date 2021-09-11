import { screenerState } from 'components/StockScreener/screener.state';
import { ColumnId } from 'components/StockScreener/screener.types';
import { FilterProps } from 'components/StockScreener/Filters/filters.map';
import { SingleFilterMenu } from 'components/StockScreener/Filters/SingleFilterMenu';
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

	async function fetchColumn(columnId: ColumnId) {
		if (!fetchedColumns.includes(columnId)) {
			addFetchedColumn(id);
			const fetched = await getData(`screener?type=${columnId}`);
			addDataColumn(fetched, id);
		}
	}

	return (
		<>
			<div className="inline-flex items-center justify-between space-x-2 border border-gray-100 px-2 py-1 whitespace-nowrap">
				<div>{filter.name}</div>
				<div onMouseEnter={() => fetchColumn(filter.columnId)}>
					<SingleFilterMenu filter={filter} />
				</div>
			</div>
		</>
	);
}
