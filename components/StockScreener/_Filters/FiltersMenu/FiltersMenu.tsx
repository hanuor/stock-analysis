import { screenerState } from 'components/StockScreener/screener.state';
import { FiltersMenuItem } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuItem';

export function FiltersMenu() {
	const filters = screenerState((state) => state.filters);
	return (
		<>
			<div className="border-b-[3px] border-blue-brand_sharp flex items-end whitespace-nowrap">
				<h3
					className="text-xl font-semibold ml-1 mb-2 mr-5 text-gray-700 dont-move"
					data-title="Filters (20)"
				>
					Filter ({filters.length})
				</h3>
				<nav>
					<ul className="navmenu">
						<FiltersMenuItem name="Popular" />
						<FiltersMenuItem name="Company" />
						<FiltersMenuItem name="Financials" />
						<FiltersMenuItem name="Valuation" />
						<FiltersMenuItem name="Dividends" />
						<FiltersMenuItem name="Technicals" />
						<FiltersMenuItem name="Other" />
						<FiltersMenuItem name="All" />
					</ul>
				</nav>
				<input
					type="text"
					className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 rounded-md ml-auto mb-0.5"
					placeholder="Find filter..."
				/>
			</div>
		</>
	);
}
