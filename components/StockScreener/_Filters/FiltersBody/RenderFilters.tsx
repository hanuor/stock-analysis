import { screenerState } from 'components/StockScreener/screener.state';
import { FilterProps } from 'components/StockScreener/screener.types';
import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import { FilterBody } from 'components/StockScreener/_Filters/FiltersBody/SingleFilter/_SingleFilter';
import { useModifyColumns } from 'components/StockScreener/functions/useModifyColumns';

function FilterWrap({ f }: { f: FilterProps }) {
	const { fetchColumn } = useModifyColumns();

	return (
		<div
			className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-1 py-1.5 text-smaller text-gray-900"
			key={f.name}
		>
			<div>{f.name}</div>
			<div onMouseEnter={() => fetchColumn(f.id)}>
				<FilterBody filter={f} />
			</div>
		</div>
	);
}

export function RenderFilters() {
	const filters = screenerState((state) => state.filters);
	const filterMenu = screenerState((state) => state.filterMenu);
	const filterSearch = screenerState((state) => state.filterSearch);

	if (filterSearch.length > 0) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2.5 text-smaller pt-1">
				{FiltersMap.map((f) => {
					if (f.name.toLowerCase().includes(filterSearch.toLowerCase())) {
						return <FilterWrap key={f.name} f={f} />;
					}
					return null;
				})}
			</div>
		);
	}

	if (filterMenu === 'Active') {
		const active = filters.map((f) => f.id);

		if (active.length === 0) {
			return (
				<div className="px-1 py-2 text-sm lg:text-base">
					No active filters. Find a filter using the search box above or
					choose a filter category from the menu.
				</div>
			);
		}

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2.5 text-smaller pt-1">
				{FiltersMap.map((f) => {
					if (active.includes(f.id)) {
						return <FilterWrap key={f.name} f={f} />;
					}
					return null;
				})}
			</div>
		);
	}

	return (
		<>
			<div
				className={`lg:grid lg:grid-cols-4 lg:gap-x-2.5 lg:text-smaller pt-1 border-b lg:border-0`}
			>
				{FiltersMap.map((f) => {
					if (f.category.includes(filterMenu) || filterMenu === 'All') {
						return <FilterWrap key={f.name} f={f} />;
					}
					return null;
				})}
			</div>
		</>
	);
}
