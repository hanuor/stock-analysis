import { useTable, usePagination } from 'react-table';
import { useMemo } from 'react';
import styles from './Actions.module.css';

const RecentTable = ({ columndata, rowdata }) => {
	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => rowdata, [rowdata]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: 200,
			},
		},
		usePagination
	);

	return (
		<>
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={`${styles.actionstable} ${styles.striped}`}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
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
