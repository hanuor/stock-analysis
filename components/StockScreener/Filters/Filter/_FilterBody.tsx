import { screenerState } from 'components/StockScreener/screener.state';
import { useEffect, useRef } from 'react';
import { FilterProps } from 'components/StockScreener/maps/filters.map';
import { isFilterSelected } from 'components/StockScreener/functions/isFilterSelected';
import { FilterButton } from './FilterButton';
import { CustomChoice } from './CustomChoice/_CustomChoice';
import { PresetChoice } from './PresetChoice';

export function FilterBody({ filter }: { filter: FilterProps }) {
	const ref = useRef<HTMLDivElement>(null);
	const filters = screenerState((state) => state.filters);
	const removeFilter = screenerState((state) => state.removeFilter);
	const removeFilteredColumn = screenerState(
		(state) => state.removeFilteredColumn
	);
	const openFilter = screenerState((state) => state.openFilter);
	const setOpenFilter = screenerState((state) => state.setOpenFilter);

	const id = filter.columnId;
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

	console.log(filters);

	return (
		<div ref={ref} className="relative inline-block text-left">
			<div>
				<FilterButton active={active} id={id} />
			</div>

			<div
				className={`transition duration-150 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-[400px] overflow-y-auto overflow-x-hidden${
					id === openFilter
						? ' visible opacity-100 transform translate-y-0'
						: ' invisible opacity-0 transform -translate-y-2'
				}`}
			>
				<div className="py-1">
					<div>
						<div
							className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 border-b border-gray-200"
							onClick={() => {
								removeFilteredColumn(id);
								removeFilter(id);
								setOpenFilter('');
							}}
						>
							Any
						</div>
					</div>
					<div>
						<CustomChoice columnId={filter.columnId} name={filter.name} />
					</div>
					{filter?.options &&
						filter.options.map((option) => (
							<PresetChoice
								key={option.value}
								option={option}
								columnId={filter.columnId}
								type={filter.filterType}
								active={active}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
