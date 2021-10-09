import { screenerState } from 'components/StockScreener/screener.state';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ColumnItemWrap } from './ColumnItemWrap';
import { ColumnSearch } from './ColumnSearch';

/**
 * The custom columns dropdown. It contains a search filter and checkbox for each column.
 * @return {JSX.Element}
 * TODO needs to work on mobile (modal?)
 */

type Props = {
	type: string;
};

export function ColumnDropdown({ type }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const [search, setSearch] = useState('');

	const open = screenerState((state) => state.columnDropdownOpen);
	const setOpen = screenerState((state) => state.setColumnDropdownOpen);

	// Close dropdown if clicked outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
				document.removeEventListener('mousedown', handleClickOutside);
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, setOpen]);

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') setOpen(true);
		if (event.key === 'Escape') setOpen(false);
	}

	return (
		<div ref={ref} className="relative inline-block text-left">
			<div
				className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 bp:px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 cursor-pointer"
				onClick={() => setOpen(!open)}
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				Columns
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
				<div className="py-1">
					<ColumnSearch search={search} setSearch={setSearch} />
					<ColumnItemWrap search={search} type={type} />
				</div>
			</div>
		</div>
	);
}
