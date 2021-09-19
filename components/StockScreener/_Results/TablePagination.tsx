import { screenerState } from 'components/StockScreener/screener.state';

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

	return (
		<nav className="mt-2.5 px-1 flex flex-row justify-between space-x-2 text-sm sm:text-base">
			<button
				onClick={() => {
					previousPage();
					setTablePage(tablePage - 2);
				}}
				disabled={!canPreviousPage}
				className="relative inline-flex items-center px-1 xs:px-1.5 sm:px-4 py-1.5 xs:py-2 whitespace-nowrap border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
			>
				{`< Previous`}
			</button>
			<div className="flex flex-row items-center space-x-3 xs:space-x-4">
				<span className="whitespace-nowrap">
					<span className="hidden xs:inline">Page </span>
					{`${pageIndex + 1} of ${pageOptions.length}`}
				</span>
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
						setTableSize(Number(e.target.value));
						setTablePage(0);
					}}
					name="perpage"
					className="block w-full pl-2 xs:pl-2.5 sm:pl-3 pr-8 xs:pr-9 sm:pr-10 py-1.5 xs:py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm sm:text-base"
				>
					<option value="20">20 Rows</option>
					<option value="50">50 Rows</option>
					<option value="100">100 Rows</option>
					<option value="200">200 Rows</option>
					<option value="9999">Show All</option>
				</select>
			</div>
			<button
				onClick={() => {
					nextPage();
					setTablePage(tablePage + 1);
				}}
				disabled={!canNextPage}
				className="relative inline-flex items-center px-1 xs:px-1.5 sm:px-4 py-1.5 xs:py-2 whitespace-nowrap border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
			>
				{`Next >`}
			</button>
		</nav>
	);
}
