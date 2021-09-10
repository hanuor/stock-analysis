import { screenerState } from 'components/StockScreener/screener.state';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FilterProps } from 'components/StockScreener/Filters/filters.map';

export function FilterDropdown({ filter }: { filter: FilterProps }) {
	const addColumn = screenerState((state) => state.addColumn);
	const removeColumn = screenerState((state) => state.removeColumn);
	const addFilter = screenerState((state) => state.addFilter);
	const removeFilter = screenerState((state) => state.removeFilter);

	const id = filter.columnId;

	// React to the select dropdown and add/remove columns
	function handleSelection(value: string) {
		if (id) {
			if (value === 'Any') {
				removeColumn(id);
				removeFilter(id);
			} else {
				addColumn(id);
				addFilter(id, value);
			}
		}
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
					Any
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
								<Menu.Item key={option}>
									<div
										className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
										onClick={() => handleSelection(option)}
									>
										{option}
									</div>
								</Menu.Item>
							))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
