import { FiltersMenuItem } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuItem';
import { FiltersMenuActive } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuActive';
import { FilterSearch } from './FilterSearch';

export function FiltersMenu() {
	return (
		<>
			<div className="border-b-[3px] border-blue-brand_sharp grid grid-cols-2 lg:flex justify-between items-end whitespace-nowrap overflow-x-auto">
				<div className="lg:order-1 pb-1 lg:pb-0">
					<FiltersMenuActive />
				</div>
				<div className="ml-auto lg:ml-0 lg:order-3 pb-1 lg:pb-0">
					<FilterSearch />
				</div>
				<div className="col-span-2 lg:order-2 border-t border-gray-200 pt-2 lg:pt-0 lg:border-0">
					<nav>
						<ul className="navmenu">
							<FiltersMenuItem name="Popular" />
							<FiltersMenuItem name="Company" />
							<FiltersMenuItem name="Financials" />
							<FiltersMenuItem name="Valuation" />
							<FiltersMenuItem name="Dividends" />
							<FiltersMenuItem name="Other" />
							<FiltersMenuItem name="All" />
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
