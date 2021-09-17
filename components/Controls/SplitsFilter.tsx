import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { actionsState } from 'state/actionsState';

interface Props {
	setColumnFilter: (columId: string, updater: any) => void;
}

export default function SplitsFilter({ setColumnFilter }: Props) {
	const [title, setTitle] = useState('All Splits');
	const setIsFiltered = actionsState((state) => state.setIsFiltered);

	useEffect(() => {
		return () => {
			setIsFiltered(false);
		};
	}, [setIsFiltered]);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 bp:px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
					{title}
					<ChevronDownIcon
						className="-mr-1 ml-2 h-5 w-5"
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
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							<div
								className="text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm cursor-default"
								onClick={() => {
									setColumnFilter('splitType', '');
									setTitle('All Splits');
									setIsFiltered(false);
								}}
							>
								All Splits
							</div>
						</Menu.Item>
						<Menu.Item>
							<div
								className="text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm cursor-default"
								onClick={() => {
									setColumnFilter('splitType', 'Forward');
									setTitle('Forward');
									setIsFiltered(true);
								}}
							>
								Forward Splits
							</div>
						</Menu.Item>
						<Menu.Item>
							<div
								className="text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm cursor-default"
								onClick={() => {
									setColumnFilter('splitType', 'Reverse');
									setTitle('Reverse');
									setIsFiltered(true);
								}}
							>
								Reverse Splits
							</div>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
