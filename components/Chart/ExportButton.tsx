import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ExportItem } from 'components/Controls/Export/ExportItem';
import { ExportItemRestricted } from 'components/Controls/Export/ExportItemRestricted';
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
	data: any;
	setData: any;
}

export function Export({ title, buttons, data, setData }: Props) {
	const isPro = authState((state) => state.isPro);
	console.log(isPro);

	useEffect(() => {
		if (typeof data !== 'undefined' && !Array.isArray(data[0])) {
			const result = [
				[
					'Date',
					'Open',
					'Close',
					'High',
					'Low',
					'Volume',
					'Moving Average (50)',
					'Moving Average (200)',
				],
			];
			for (let i = 0; i < data.length; i++) {
				const arr = [
					data[i].date,
					data[i].open,
					data[i].close,
					data[i].high,
					data[i].low,
					data[i].volume,
					data[i].ma1,
					data[i].ma2,
				];
				result.push(arr);
			}
			setData(result);
		}
	}, [data, setData]);

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
										data={data}
										isTable={false}
										fixValuef={undefined}
									/>
								)
							)}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
