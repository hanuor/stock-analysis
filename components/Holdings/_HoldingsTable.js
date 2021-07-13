import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import Pagination from 'components/Tables/Pagination';
import styles from './HoldingsTable.module.css';
import Paywall from './HoldingsPaywall';
import { StockLink, ETFLink } from 'components/Links';
import { authState } from 'state/authState';

const _HoldingsTable = ({ rawdata }) => {
	const isPro = authState((state) => state.isPro);

	const columns = useMemo(
		() => [
			{
				Header: 'No.',
				accessor: 'no',
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				Cell: function FormatCell({ cell: { value } }) {
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
				<Pagination
					previousPage={previousPage}
					canPreviousPage={canPreviousPage}
					pageIndex={pageIndex}
					pageOptions={pageOptions}
					pageSize={pageSize}
					setPageSize={setPageSize}
					nextPage={nextPage}
					canNextPage={canNextPage}
				/>
			) : (
				<Paywall total={rows.length} />
			)}
		</>
	);
};

export default _HoldingsTable;
