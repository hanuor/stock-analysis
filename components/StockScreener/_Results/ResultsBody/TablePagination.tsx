import { DropdownSelect } from 'components/DropdownSelect';
import { screenerState } from 'components/StockScreener/screener.state';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';

interface Props {
	previousPage: () => void;
	canPreviousPage: boolean;
	pageIndex: number;
	pageOptions: number[];
	pageSize: number;
	setPageSize: (pageSize: number) => void;
	nextPage: () => void;
	canNextPage: boolean;
}

// TODO make 200 rows and "show all" available for pro members later
export function TablePagination({
	previousPage,
	canPreviousPage,
	pageIndex,
	pageOptions,
	pageSize,
	setPageSize,
	nextPage,
	canNextPage,
}: Props) {
	const tablePage = screenerState((state) => state.tablePage);
	const setTablePage = screenerState((state) => state.setTablePage);
	const setTableSize = screenerState((state) => state.setTableSize);

	const selectOptions = [
		{ value: 20, name: '20 Rows' },
		{ value: 50, name: '50 Rows' },
		{ value: 100, name: '100 Rows' },
		// { value: 200, name: '200 Rows' },
		// { value: 9999, name: 'Show All' },
	];

	function setSelected(value: number) {
		setPageSize(value);
		setTableSize(value);
		setTablePage(0);
	}

	return (
		<nav className="mt-2.5 py-1 px-0.5 flex flex-row items-center justify-between space-x-1.5 bp:space-x-2 text-sm sm:text-base overflow-x-auto hide-scroll">
			<button
				onClick={() => {
					previousPage();
					setTablePage(tablePage - 2);
				}}
				disabled={!canPreviousPage}
				className={`flex items-center border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 py-2 pl-1.5 pr-2.5 sm:pr-3${
					!canPreviousPage
						? ' cursor-default hover:bg-white'
						: ' cursor-pointer'
				}`}
			>
				<ChevronLeftIcon className="w-4 h-4 -mb-px" />
				<div className="hidden xs:inline">Previous</div>
			</button>
			<div className="flex flex-row items-center space-x-2 bp:space-x-4 font-medium text-gray-700">
				<span className="whitespace-nowrap">
					<span className="hidden bp:inline">Page </span>
					{`${pageIndex + 1} of ${pageOptions.length}`}
				</span>
				<DropdownSelect
					selected={pageSize}
					setSelected={setSelected}
					selectOptions={selectOptions}
				/>
			</div>
			<button
				onClick={() => {
					nextPage();
					setTablePage(tablePage + 1);
				}}
				disabled={!canNextPage}
				className={`flex items-center border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 py-2 pr-1.5 pl-2.5 sm:pl-3${
					!canNextPage
						? ' cursor-default hover:bg-white'
						: ' cursor-pointer'
				}`}
			>
				<div className="hidden xs:inline">Next</div>
				<ChevronRightIcon className="w-4 h-4 -mb-px" />
			</button>
		</nav>
	);
}
