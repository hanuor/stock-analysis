import { SaveIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useSavedScreens } from './useSavedScreens';

export function SaveFiltersButton() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const { add } = useSavedScreens();

	async function handleSubmit(name: string) {
		add.mutate(name);
		setName('');
		setOpen(false);
	}

	return (
		<>
			<div className="relative">
				<button
					className="py-2 px-3 bg-gray-500 hover:bg-gray-600 text-white text-smaller font-medium rounded flex items-center space-x-2 cursor-pointer whitespace-nowrap"
					onClick={() => setOpen(!open)}
				>
					<SaveIcon
						className="h-[1.15rem] w-[1.15rem] text-white"
						aria-hidden="true"
					/>
					<div>Save Current</div>
				</button>
				<div
					className={`transition duration-150 origin-top-right absolute right-2 lg:absolute lg:right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 w-[260px]${
						open
							? ' visible opacity-100 transform translate-y-0'
							: ' invisible opacity-0 transform -translate-y-2'
					}`}
				>
					<div className="flex flex-row">
						<input
							type="text"
							placeholder="Enter screen name"
							className="border-gray-200 focus:ring-0 focus:border-blue-300 text-gray-700 text-smaller rounded-l"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button
							className="px-3 bg-blue-brand_light hover:bg-blue-brand_sharp text-white text-smaller font-medium rounded-r flex-grow"
							onClick={() => handleSubmit(name)}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
