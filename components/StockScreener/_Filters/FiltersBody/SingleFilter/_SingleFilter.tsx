import { screenerState } from 'components/StockScreener/screener.state';
import { useEffect, useRef } from 'react';
import { FilterProps } from 'components/StockScreener/screener.types';
import { isFilterSelected } from 'components/StockScreener/functions/isFilterSelected';
import { FilterButton } from './FilterButton';
import { CloseCircleIcon } from 'components/Icons/CloseCircle';
import { NumericFilter } from './FilterTypes/NumericFilter';
import { StringFilter } from './FilterTypes/StringFilter';
import { useModifyFilters } from 'components/StockScreener/functions/useModifyFilters';

/**
 * FilterBody
 * The wrapper component for an individual filter with button + dropdown (such as PE ratio)
 * @param {FilterProps} filter The properties for the filter
 * @return Component
 */

export function FilterBody({ filter }: { filter: FilterProps }) {
	const ref = useRef<HTMLDivElement>(null);
	const filters = screenerState((state) => state.filters);
	const openFilter = screenerState((state) => state.openFilter);
	const setOpenFilter = screenerState((state) => state.setOpenFilter);
	const { remove } = useModifyFilters();

	const { id, filterType } = filter;
	const active = isFilterSelected(id, filters);

	// Close dropdown if clicked outside of filter dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpenFilter('');
				document.removeEventListener('mousedown', handleClickOutside);
			}
		};

		if (id === openFilter) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [id, openFilter, ref, setOpenFilter]);

	const Filter = filterType === 'numeric' ? NumericFilter : StringFilter;

	return (
		<div ref={ref} className="relative inline-block text-left">
			<div className="flex items-center">
				{active && (
					<div
						className="mr-1.5 text-gray-500 hover:text-red-500 focus:text-red-500 focus:outline-none cursor-pointer"
						title="Clear Filter"
						tabIndex={0}
						onClick={() => remove(id)}
						onKeyPress={(e) => e.key === 'Enter' && remove(id)}
					>
						<CloseCircleIcon classes="w-[1.2rem] h-[1.2rem]" />
					</div>
				)}
				<FilterButton active={active} id={id} />
			</div>

			<div
				className={`transition duration-150 origin-top-right absolute right-2 lg:absolute lg:right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 w-[260px]${
					id === openFilter
						? ' visible opacity-100 transform translate-y-0'
						: ' invisible opacity-0 transform -translate-y-2'
				}`}
			>
				<Filter filter={filter} active={active} />
			</div>
		</div>
	);
}
