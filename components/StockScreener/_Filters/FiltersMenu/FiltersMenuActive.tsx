import { screenerState } from 'components/StockScreener/screener.state';
import { screenerDataState } from 'components/StockScreener//screenerdata.state';
import { CloseCircleIcon } from 'components/Icons/CloseCircle';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';

export function FiltersMenuActive() {
	const filters = screenerState((state) => state.filters);
	const filterMenu = screenerState((state) => state.filterMenu);
	const resultsMenu = screenerState((state) => state.resultsMenu);
	const setFilterMenu = screenerState((state) => state.setFilterMenu);
	const clearFilters = screenerState((state) => state.clearFilters);
	const filtersShown = screenerState((state) => state.filtersShown);
	const setFiltersShown = screenerState((state) => state.setFiltersShown);
	const setShowColumns = screenerState((state) => state.setShowColumns);

	const count = filters.length;

	let classes =
		'text-lg font-semibold ml-0.5 lg:ml-1 cursor-pointer flex focus:outline-none focus:font-bold';
	if (filterMenu !== 'Active') {
		classes += ' bll';
	}
	const type = screenerDataState((state) => state.type);

	return (
		<>
			<div className="mb-1.5 flex items-center w-[110px]">
				{filtersShown ? (
					<div title="Hide Filter Area">
						<ChevronDownIcon
							className="h-6 w-6 text-gray-700 cursor-pointer -mb-1"
							aria-hidden="true"
							onClick={() => setFiltersShown(false)}
						/>
					</div>
				) : (
					<div title="Show Filter Area">
						<ChevronRightIcon
							className="h-6 w-6 text-gray-700 cursor-pointer -mb-1"
							aria-hidden="true"
							onClick={() => setFiltersShown(true)}
						/>
					</div>
				)}

				<div
					className={classes}
					onClick={() => setFilterMenu('Active')}
					onKeyPress={(e) => e.key === 'Enter' && setFilterMenu('Active')}
					tabIndex={0}
				>
					<span>Filters</span>
					<div className="ml-1 dont-move" data-title="(2)">
						({count})
					</div>
				</div>
				{count > 0 && (
					<div
						className="text-gray-600 hover:text-red-500 cursor-pointer flex items-center font-semibold text-small"
						title="Clear All Filters"
						onClick={() => {
							clearFilters();
							if (resultsMenu === 'Filtered' && type != 'etfs') {
								setShowColumns(['s', 'n', 'm']);
							} else {
								setShowColumns(['s', 'n']);
							}
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								clearFilters();
								if (resultsMenu === 'Filtered' && type != 'etfs') {
									setShowColumns(['s', 'n', 'm']);
								} else {
									setShowColumns(['s', 'n']);
								}
							}
						}}
						tabIndex={0}
					>
						<CloseCircleIcon classes="w-4 h-4 ml-1 lg:ml-2 -mb-0.5" />
						<div className="ml-[1.5px]">Clear</div>
					</div>
				)}
			</div>
		</>
	);
}
