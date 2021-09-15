import { screenerState } from 'components/StockScreener/screener.state';
import { ColumnId } from 'components/StockScreener/screener.types';
import { ChevronDownIcon } from '@heroicons/react/solid';

type Props = {
	active: string | false;
	id: ColumnId;
};

export function FilterButton({ active, id }: Props) {
	const filters = screenerState((state) => state.filters);
	const openFilter = screenerState((state) => state.openFilter);
	const setOpenFilter = screenerState((state) => state.setOpenFilter);

	function findName() {
		const name = filters.find((filter) => filter.columnId === id)?.name;
		return name ?? 'Filter';
	}

	function handleClick() {
		if (id === openFilter) {
			setOpenFilter('');
		} else {
			setOpenFilter(id);
		}
	}

	const buttonText = active ? findName() : 'Any';

	return (
		<div
			className={`inline-flex justify-between w-[140px] rounded border border-gray-200 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 cursor-pointer${
				active ? ' bg-yellow-100 px-2' : ''
			}`}
			onClick={handleClick}
		>
			<span className="overflow-hidden overflow-ellipsis">{buttonText}</span>

			<ChevronDownIcon
				className="-mr-1 ml-2 h-5 w-5 pointer-events-none"
				aria-hidden="true"
			/>
		</div>
	);
}
