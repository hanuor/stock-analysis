import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const options = [
	{ id: 'over', name: 'Over' },
	{ id: 'under', name: 'Under' },
	{ id: 'between', name: 'Between' },
	{ id: 'exactly', name: 'Exactly' },
];

export function SelectComparison() {
	const [selected, setSelected] = useState(options[0]);

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<>
					<div className="relative">
						<Listbox.Button className="relative w-full pl-2 pr-8 py-2 text-left cursor-default focus:outline-none focus:ring-0 text-sm">
							<span className="block truncate">{selected.name}</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<ChevronDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 w-[6rem] bg-white shadow-lg max-h-60 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{options.map((option) => (
									<Listbox.Option
										key={option.id}
										className={({ active }) =>
											classNames(
												active
													? 'text-gray-900 bg-gray-100'
													: 'text-gray-900',
												'cursor-default select-none relative py-2 pl-2 pr-4'
											)
										}
										value={option}
									>
										{({ selected }) => (
											<>
												<span
													className={classNames(
														selected
															? 'font-semibold'
															: 'font-normal',
														'block truncate'
													)}
												>
													{option.name}
												</span>
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
