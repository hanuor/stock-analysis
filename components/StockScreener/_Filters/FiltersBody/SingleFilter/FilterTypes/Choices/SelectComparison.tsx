import { Dispatch, Fragment, SetStateAction } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ComparisonOption } from 'components/StockScreener/screener.types';

function capitalize(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const options = ['over', 'under', 'between', 'exactly', 'notzero'];

type Props = {
	compare: ComparisonOption;
	setCompare: Dispatch<SetStateAction<ComparisonOption>>;
};

export function SelectComparison({ compare, setCompare }: Props) {
	return (
		<Listbox value={compare} onChange={setCompare}>
			{({ open }) => (
				<>
					<div className="relative">
						<Listbox.Button className="relative w-full pl-2 pr-7 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-smaller font-semibold text-gray-800">
							<span className="block truncate">
								{compare === 'notzero'
									? 'Not Zero'
									: capitalize(compare)}
							</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<ChevronDownIcon
									className="h-5 w-5 text-gray-700"
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
										key={option}
										className={({ active }) =>
											classNames(
												active ? 'bg-gray-100' : '',
												'cursor-default select-none relative py-2 pl-2 pr-4 text-gray-900'
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
													{option === 'notzero'
														? 'Not Zero'
														: capitalize(option)}
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
