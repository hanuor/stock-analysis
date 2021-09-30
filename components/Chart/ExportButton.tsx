import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
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
		<Menu
			as="div"
			className="relative xs:inline-block text-left hidden
		"
		>
			<div>
				<Menu.Button className="inline-flex relative ml:border-r-0 border-r pl-4 border-gray-300 bp:pr-4 py-2 text-xs bpm:text-base pr-8 border-r focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 focus:outline-none">
					{title}

					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="bpm:h-6 h-4 w-8 text-gray-500"
						fill="none"
						viewBox="0 0 20 20"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
							d="M6 8l4 4 4-4"
						/>
					</svg>
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
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  focus:outline-none ">
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
