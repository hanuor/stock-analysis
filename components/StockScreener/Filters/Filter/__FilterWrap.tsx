import { screenerState } from 'components/StockScreener/screener.state';
import { ColumnId, FilterProps } from 'components/StockScreener/screener.types';
import { FilterBody } from 'components/StockScreener/Filters/Filter/_FilterBody';
import { getData } from 'functions/API';

export function FilterWrap({ filter }: { filter: FilterProps }) {
	const fetchedColumns = screenerState((state) => state.fetchedColumns);
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn);
	const addDataColumn = screenerState((state) => state.addDataColumn);
	const filterMenu = screenerState((state) => state.filterMenu);

	if (!filter.category.includes(filterMenu) && filterMenu !== 'All') {
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
			<div className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-1.5 py-2">
				<div>{filter.name}</div>
				<div onMouseEnter={() => fetchColumn(filter.columnId)}>
					<FilterBody filter={filter} />
				</div>
			</div>
		</>
	);
}
