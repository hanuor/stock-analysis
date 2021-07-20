import { Holding } from 'types/Holdings';
import { useTable, usePagination, Column } from 'react-table';
import { useMemo } from 'react';
import styles from './HoldingsTable.module.css';
import { HoldingsPaywall } from './HoldingsPaywall';
import { StockLink, ETFLink } from 'components/Links';
import { authState } from 'state/authState';

export const HoldingsTable = ({ rawdata }: { rawdata: Holding[] }) => {
	const isPro = authState((state) => state.isPro);

	type CellString = {
		cell: {
			value: string;
		};
	};

	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'No.',
				accessor: 'no',
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				Cell: function FormatCell({ cell: { value } }: CellString) {
					if (value.startsWith('$')) {
						return <StockLink symbol={value.slice(1)} />;
					} else if (value.startsWith('#')) {
						return <ETFLink symbol={value.slice(1)} />;
					}
					return value;
				},
			},
			{
				Header: 'Company Name',
				accessor: 'name',
			},
			{
				Header: '% Assets',
				accessor: 'assets',
			},
			{
				Header: 'Shares',
				accessor: 'shares',
			},
		],
		[]
	);

	const data = useMemo(() => rawdata, [rawdata]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
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
				<table {...getTableProps()} className={styles.table}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column, index) => (
									<th {...column.getHeaderProps()} key={index}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={index}>
									{row.cells.map((cell, index) => {
										return (
											<td {...cell.getCellProps()} key={index}>
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
			{isPro && rows.length > 200 ? (
				<nav className="mt-2.5 px-1 flex flex-row justify-between space-x-2 text-sm sm:text-base">
					<button
						onClick={() => previousPage()}
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
							}}
							name="perpage"
							className="block w-full pl-2 xs:pl-2.5 sm:pl-3 pr-8 xs:pr-9 sm:pr-10 py-1.5 xs:py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm sm:text-base"
						>
							<option value="200">200</option>
							<option value="500">500</option>
							<option value="1000">1000</option>
							<option value="10000">10000</option>
						</select>
					</div>
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						className="relative inline-flex items-center px-1 xs:px-1.5 sm:px-4 py-1.5 xs:py-2 whitespace-nowrap border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						{`Next >`}
					</button>
				</nav>
			) : (
				<HoldingsPaywall total={rows.length} />
			)}
		</>
	);
};
