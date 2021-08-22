// Used on the /stocks/ and /etf/ index pages
import { useMemo } from 'react';
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	Column,
} from 'react-table';
import styles from './SymbolTable.module.css';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { GlobalFilter } from 'components/Tables/GlobalFilter';
import { tableState } from 'state/tableState';

interface StockType {
	s: string;
	n: string;
	cls?: string;
	aum?: number;
	ind?: string;
	mcap?: number;
}

interface Props {
	title: string;
	columndata: Column[];
	rowdata: StockType[];
}

export const SymbolTable = ({ title, columndata, rowdata }: Props) => {
	const tablePage = tableState((state) => state.tablePage);
	const setTablePage = tableState((state) => state.setTablePage);
	const tableSize = tableState((state) => state.tableSize);
	const setTableSize = tableState((state) => state.setTableSize);
	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => rowdata, [rowdata]);

	const {
		headerGroups,
		prepareRow,
		page,
		rows,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		setPageSize,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: tablePage,
				pageSize: tableSize,
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<>
			<div className="flex flex-row items-end justify-between space-x-4 mb-2 px-0.5 xs:px-1">
				<span className="text-lg xs:text-xl sm:text-2xl font-semibold mb-1 whitespace-nowrap">
					{rows.length} {title}
				</span>
				<div>
					<GlobalFilter
						useAsyncDebounce={useAsyncDebounce}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className={styles.table}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th
										{...column.getSortByToggleProps({
											title: `Sort by: ${column.Header}`,
										})}
										key={index}
									>
										<span className="inline-flex flex-row items-center">
											{column.render('Header')}

											{column.isSorted ? (
												column.isSortedDesc ? (
													<SortDownIcon classes="h-5 w-5 text-gray-800" />
												) : (
													<SortUpIcon classes="h-5 w-5 text-gray-800" />
												)
											) : (
												''
											)}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<tr key={index}>
									{row.cells.map((cell, index) => {
										return <td key={index}>{cell.render('Cell')}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
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
						}}
						name="perpage"
						className="block w-full pl-2 xs:pl-2.5 sm:pl-3 pr-8 xs:pr-9 sm:pr-10 py-1.5 xs:py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm sm:text-base"
					>
						<option value="500">500</option>
						<option value="1000">1000</option>
						<option value="10000">10000</option>
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
			<div className="text-center mt-6">
				<button
					className="bll text-lg"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>
					Back to Top &#8593;
				</button>
			</div>
		</>
	);
};
