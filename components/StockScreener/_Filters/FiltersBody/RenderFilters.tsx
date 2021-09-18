import { screenerState } from 'components/StockScreener/screener.state';
import { FilterId } from 'components/StockScreener/screener.types';
import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import { FilterBody } from 'components/StockScreener/_Filters/FiltersBody/SingleFilter/_SingleFilter';
import { getData } from 'functions/API';

export function RenderFilters() {
	const fetchedColumns = screenerState((state) => state.fetchedColumns);
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn);
	const addDataColumn = screenerState((state) => state.addDataColumn);
	const filterMenu = screenerState((state) => state.filterMenu);

	async function fetchColumn(id: FilterId) {
		if (!fetchedColumns.includes(id)) {
			addFetchedColumn(id);
			const fetched = await getData(`screener?type=${id}`);
			addDataColumn(fetched, id);
		}
	}

	return (
		<div className="grid grid-cols-1 bp:grid-cols-2 lg:grid-cols-4 gap-x-2.5 text-base pt-1">
			{FiltersMap.map((filter) => {
				if (filter.category.includes(filterMenu) || filterMenu === 'All') {
					return (
						<div
							className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-1 py-2 text-base text-gray-800"
							key={filter.name}
						>
							<div>{filter.name}</div>
							<div onMouseEnter={() => fetchColumn(filter.id)}>
								<FilterBody filter={filter} />
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}
