import { screenerState } from 'components/StockScreener/screener.state';
import { CloseCircleIcon } from 'components/Icons/CloseCircle';
import { ChevronDownIcon } from '@heroicons/react/solid';
// import { ChevronRightIcon } from '@heroicons/react/solid';

// TODO enable hiding functionality for dropdown icon
export function FiltersMenuActive() {
	const filters = screenerState((state) => state.filters);
	const filterMenu = screenerState((state) => state.filterMenu);
	const setFilterMenu = screenerState((state) => state.setFilterMenu);
	const clearFilters = screenerState((state) => state.clearFilters);

	const count = filters.length;

	let classes = 'text-lg font-semibold ml-1 cursor-pointer flex';
	if (filterMenu !== 'Active') {
		classes += ' bll';
	}

	return (
		<>
			<div className="mb-1.5 flex items-center w-[110px]">
				<ChevronDownIcon
					className="h-6 w-6 text-gray-700 cursor-pointer -mb-1"
					aria-hidden="true"
					onClick={() => console.log('hide filter body')}
				/>
				<div className={classes} onClick={() => setFilterMenu('Active')}>
					<span>Filters</span>
					<div className="ml-1 dont-move" data-title="(2)">
						({count})
					</div>
				</div>
				{count > 0 && (
					<div
						className="text-gray-600 hover:text-red-500 cursor-pointer flex items-center font-semibold text-small"
						title="Clear All Filters"
						onClick={() => clearFilters()}
					>
						<CloseCircleIcon classes="w-4 h-4 ml-2 -mb-0.5" />
						<div className="ml-[1.5px]">Clear</div>
					</div>
				)}
			</div>
		</>
	);
}
