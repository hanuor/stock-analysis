import { screenerState } from 'components/StockScreener/screener.state';
import { FilterMenuItem } from 'components/StockScreener/Filters/FilterMenuItem';

export function FilterMenu() {
	const filters = screenerState((state) => state.filters);
	return (
		<>
			<div className="border-b-[3px] border-blue-brand_sharp flex items-end whitespace-nowrap">
				<h3 className="text-xl font-semibold ml-1 mb-2 mr-8 text-gray-700">
					Filter ({filters.length})
				</h3>
				<nav>
					<ul className="navmenu">
						<FilterMenuItem name="Popular" />
						<FilterMenuItem name="Company" />
						<FilterMenuItem name="Financials" />
						<FilterMenuItem name="Valuation" />
						<FilterMenuItem name="Dividends" />
						<FilterMenuItem name="Technicals" />
						<FilterMenuItem name="Other" />
						<FilterMenuItem name="All" />
					</ul>
				</nav>
			</div>
		</>
	);
}
