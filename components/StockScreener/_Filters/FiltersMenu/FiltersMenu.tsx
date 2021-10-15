import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { screenerState } from 'components/StockScreener/screener.state';
import { FiltersMenuItem } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuItem';
import { FiltersMenuActive } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuActive';
import { FilterSearch } from './FilterSearch';

export function FiltersMenu() {
	const type = screenerDataState((state) => state.type);
	const filtersShown = screenerState((state) => state.filtersShown);

	const showHideBorder = filtersShown ? ' border-b border-gray-300' : '';
	const showHideFilters = !filtersShown ? ' hidden lg:block' : '';

	return (
		<>
			<div
				className={`grid grid-cols-2 lg:flex justify-between items-end whitespace-nowrap overflow-x-auto${showHideBorder}`}
			>
				<div className="lg:order-1">
					<FiltersMenuActive />
				</div>
				<div className="ml-auto lg:ml-0 lg:order-3">
					<FilterSearch />
				</div>
				<div
					className={`col-span-2 lg:order-2 border-t border-gray-200 pt-2 lg:pt-0 lg:border-0${showHideFilters}`}
				>
					<nav>
						<ul className="navmenu darkbg bg-gray-50 noshadow">
							{type == 'stock' ? (
								<>
									<FiltersMenuItem name="Popular" />
									<FiltersMenuItem name="Company" />
									<FiltersMenuItem name="Financials" />
									<FiltersMenuItem name="Valuation" />
									<FiltersMenuItem name="Dividends" />
									<FiltersMenuItem name="Other" />
									<FiltersMenuItem name="All" />
								</>
							) : (
								<>
									<FiltersMenuItem name="General" />
									<FiltersMenuItem name="Company" />
									<FiltersMenuItem name="Income" />
									<FiltersMenuItem name="Balance Sheet" />
									<FiltersMenuItem name="Cash Flow" />
									<FiltersMenuItem name="All" />
								</>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
