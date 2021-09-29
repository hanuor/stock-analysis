import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ExportItem } from './Export/ExportItem';
import { ExportItemRestricted } from './Export/ExportItemRestricted';
import { authState } from 'state/authState';

type Button = {
	title: string;
	type: 'csv' | 'xlsx';
	restricted: boolean;
	active?: boolean;
};

interface Props {
	title: string;
	buttons: Button[];
	tableId: string;
}

export function Export({ title, buttons, tableId }: Props) {
	const isPro = authState((state) => state.isPro);

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
						{buttons &&
							buttons.map((button, index) =>
								button.restricted && !isPro ? (
									<ExportItemRestricted
										key={index}
										title={button.title}
										type={button.type}
									/>
								) : (
									<ExportItem
										key={index}
										title={button.title}
										type={button.type}
										data={tableId}
										fixValuef={(value: any) => {
											if (
												value.includes('href=') ||
												value.includes('class=')
											) {
												// Grab value between > and 2nd <
												const start = value.indexOf('>') + 1;
												const end = value.indexOf('<', 1);
												return value.substring(start, end);
											}
											if (value.includes('title=')) {
												// Grab value between double quotes
												const start = value.indexOf('"') + 1;
												const end = value.lastIndexOf('"');
												return value.substring(start, end);
											}
											return value;
										}}
									/>
								)
							)}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
