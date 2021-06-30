import { useMemo } from 'react';
import Link from 'next/link';
import { useTable } from 'react-table';
import styles from './HistoryTable.module.css';

export default function Table({ rawdata }) {
	const columns = useMemo(
		() => [
			{
				Header: 'Ex-Dividend Date',
				accessor: 'exDate',
			},
			{
				Header: 'Cash Amount',
				accessor: 'amount',
			},
			{
				Header: 'Record Date',
				accessor: 'recordDate',
			},
			{
				Header: 'Pay Date',
				accessor: 'payDate',
			},
		],
		[]
	);

	const data = useMemo(() => rawdata, [rawdata]);

	const tableInstance = useTable({ columns, data });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<div className="mt-4 bp:mt-7">
			<div className="sm:flex flex-row justify-between px-1 items-end mb-2 sm:mb-1">
				<h2 className="hh2 mb-0.5 sm:mb-2">Dividend History</h2>
				<span>
					<Link href="/how-often-are-dividends-paid/">
						<a className="bll">What do the dates mean?</a>
					</Link>
				</span>
			</div>
			<div className="overflow-x-auto">
				<table {...getTableProps()} className={styles.table}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header') ===
										'Ex-Dividend Date' ? (
											<>
												Ex-Div
												<span className="hidden sm:inline">
													idend
												</span>{' '}
												Date
											</>
										) : column.render('Header') === 'Cash Amount' ? (
											<>
												<span className="hidden sm:inline">
													Cash{' '}
												</span>
												Amount
											</>
										) : (
											<>{column.render('Header')}</>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
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
		</div>
	);
}
