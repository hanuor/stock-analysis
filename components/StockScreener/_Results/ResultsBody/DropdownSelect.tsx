import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

function getName(selected: number | string, selectOptions: SelectOption[]) {
	const found = selectOptions.find((item) => item.value === selected);
	return found?.name;
}

type SelectOption = {
	value: string | number;
	name: string | number;
};

type Props = {
	selected: number | string;
	setSelected: any;
	selectOptions: SelectOption[];
};

export function DropdownSelect({
	selected,
	setSelected,
	selectOptions,
}: Props) {
	return (
		<Listbox value={selected} onChange={setSelected}>
			<div>
				<Listbox.Button className="bg-white relative max-w-[130px] border border-gray-300 rounded-md shadow-sm pl-2 bp:pl-3 pr-8 bp:pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base font-medium text-gray-700">
					<span className="block truncate">
						{getName(selected, selectOptions)}
					</span>
					<span className="absolute inset-y-0 right-0 flex items-center pr-1 bp:pr-2 pointer-events-none">
						<SelectorIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>

				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute z-10 mt-1 max-w-[130px] bg-white shadow-lg max-h-60 rounded-md py-1 text-sm sm:text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
						{selectOptions.map((option) => (
							<Listbox.Option
								key={option.value}
								className={({ active }) =>
									classNames(
										active ? 'bg-gray-200' : '',
										'cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-700'
									)
								}
								value={option.value}
							>
								{({ selected, active }) => (
									<>
										<span
											className={classNames(
												selected ? 'font-semibold' : 'font-normal',
												'block truncate'
											)}
										>
											{option.name}
										</span>

										{selected ? (
											<span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-3">
												<CheckIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
