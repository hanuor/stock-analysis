import { screenerState } from 'components/StockScreener/screener.state';
import { FilterMenuItem } from 'components/StockScreener/Filters/FilterMenuItem';

export function FilterMenu() {
	const filters = screenerState((state) => state.filters);

	return (
		<>
			<div className="flex items-center border-t border-b border-gray-200 bg-gray-50 px-3 overflow-x-auto">
				<h3 className="font-semibold mr-5">Filters ({filters.length})</h3>
				<div className="mx-auto">
					<ul className="flex space-x-2 filter-menu">
						<FilterMenuItem name="Popular" />
						<FilterMenuItem name="Company" />
						<FilterMenuItem name="Financials" />
						<FilterMenuItem name="Valuation" />
						<FilterMenuItem name="Dividends" />
						<FilterMenuItem name="Analysts" />
						<FilterMenuItem name="Technicals" />
						<FilterMenuItem name="Other" />
						<FilterMenuItem name="All" />
					</ul>
				</div>
			</div>
		</>
	);
}
