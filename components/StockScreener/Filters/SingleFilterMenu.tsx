import { screenerState } from 'components/StockScreener/screener.state';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FilterProps } from 'components/StockScreener/maps/filters.map';
import { isFilterSelected } from 'components/StockScreener/functions/isFilterSelected';

export function SingleFilterMenu({ filter }: { filter: FilterProps }) {
	const filters = screenerState((state) => state.filters);
	const addFilteredColumn = screenerState((state) => state.addFilteredColumn);
	const removeFilteredColumn = screenerState(
		(state) => state.removeFilteredColumn
	);
	const addFilter = screenerState((state) => state.addFilter);
	const removeFilter = screenerState((state) => state.removeFilter);
	const resultsMenu = screenerState((state) => state.resultsMenu);
	const setShowColumns = screenerState((state) => state.setShowColumns);
	const filteredColumns = screenerState((state) => state.filteredColumns);
	// console.log(resultsMenu);
	// console.log(filteredColumns);

	const id = filter.columnId;
	const active = isFilterSelected(id, filters);

	// React to the select dropdown and add/remove columns
	function handleSelection(name: string, value: string) {
		if (id) {
			// If Any is selected, remove value from filters
			if (value === 'Any') {
				removeFilteredColumn(id);
				removeFilter(id);
			} else {
				// If changing an active filter, first remove the existing filter
				if (active) {
					removeFilter(id);
					removeFilteredColumn(id);
				}
				// If viewing the filtered columns, make them update right away
				if (resultsMenu === 'Filtered') {
					const newColumns = [...filteredColumns]; // Need to copy the array in order for state to update
					newColumns.push(id);
					setShowColumns(newColumns);
				}
				// Add new filters
				addFilteredColumn(id);
				addFilter(id, name, value, filter.filterType);
			}
		}
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button
					className={`inline-flex justify-between w-[140px] rounded border border-gray-200 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500${
						active ? ' bg-yellow-100 px-2' : ''
					}`}
				>
					{active ? (
						<span className="overflow-hidden overflow-ellipsis">
							{active}
						</span>
					) : (
						'Any'
					)}
					<ChevronDownIcon
						className="-mr-1 ml-2 h-5 w-5 pointer-events-none"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
					<div className="py-1">
						{filter?.options &&
							filter.options.map((option) => (
								<Menu.Item key={option.value}>
									<div
										className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
										onClick={() =>
											handleSelection(option.name, option.value)
										}
									>
										{option.name}
									</div>
								</Menu.Item>
							))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
