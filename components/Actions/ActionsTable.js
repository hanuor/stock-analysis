import {
	useTable,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
} from 'react-table';
import { useMemo } from 'react';
import styles from './Actions.module.css';
import { useState } from 'react';
import { SortUp, SortDown } from '@/components/Icons';

function GlobalFilter({ globalFilter, setGlobalFilter }) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 100);

	return (
		<input
			className="shadow-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
			value={value || ''}
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
			placeholder="Filter..."
		/>
	);
}

const RecentTable = ({ columndata, rowdata }) => {
	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => rowdata, [rowdata]);

	const {
		getTableProps,
		getTableBodyProps,
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
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: 200,
			},
		},

		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<>
			<div className="flex flex-row justify-between mb-1 px-1">
				<span className="text-2xl font-semibold">{rows.length} Items</span>
				<div>
					<GlobalFilter
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={`${styles.actionstable} ${styles.striped}`}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps(
											column.getSortByToggleProps({
												title: `Sort by: ${column.Header}`,
											})
										)}>
										<span className="inline-flex flex-row items-center">
											{column.render('Header')}

											{column.isSorted ? (
												column.isSortedDesc ? (
													<SortDown classes="h-5 w-5 text-gray-800" />
												) : (
													<SortUp classes="h-5 w-5 text-gray-800" />
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
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<nav className="mt-2 px-1 flex flex-row justify-between">
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
					className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					{`< Previous`}
				</button>
				<div className="flex flex-row items-center space-x-6">
					<span className="whitespace-nowrap">{`Page ${pageIndex + 1} of ${
						pageOptions.length
					}`}</span>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
						name="perpage"
						className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
						<option value="200">200</option>
						<option value="500">500</option>
						<option value="1000">1000</option>
						<option value="10000">10000</option>
					</select>
				</div>
				<button
					onClick={() => nextPage()}
					disabled={!canNextPage}
					className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					{`Next >`}
				</button>
			</nav>
		</>
	);
};

export default RecentTable;
