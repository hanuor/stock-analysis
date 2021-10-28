import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useState, useRef, useEffect } from 'react';
import { SavedDropdown } from './SavedDropdown';

export function SavedFilters() {
	const type = screenerDataState((state) => state.type);
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') setOpen(true);
		if (event.key === 'Escape') setOpen(false);
	}

	// Close dropdown if clicked outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
				document.removeEventListener('mousedown', handleClickOutside);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
				document.removeEventListener('keydown', handleEscape);
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open, setOpen]);

	return (
		<div className="flex-grow">
			<label
				htmlFor="location"
				className="hidden md:block text-sm font-medium text-gray-700"
			>
				Saved Screens
			</label>
			<div ref={ref} className="relative">
				<div
					className="inline-flex justify-between md:justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 bp:px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 cursor-pointer whitespace-nowrap"
					onClick={() => setOpen(!open)}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					Select saved
					<ChevronDownIcon
						className="-mr-1 ml-2 h-5 w-5"
						aria-hidden="true"
					/>
				</div>

				<div
					className={`transition duration-150 origin-top-right absolute right-2 lg:absolute lg:right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 w-[260px]${
						open
							? ' visible opacity-100 transform translate-y-0'
							: ' invisible opacity-0 transform -translate-y-2'
					}`}
				>
					<SavedDropdown type={type} />
				</div>
			</div>
		</div>
	);
}
