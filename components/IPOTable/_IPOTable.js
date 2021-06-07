import { useTable, useSortBy } from 'react-table';
import styles from './IPOTable.module.css';
import Link from 'next/link';
import { useMemo } from 'react';
import { SortUp, SortDown } from '@/components/Icons';

const IPOTable = ({ rawdata }) => {
	const columns = useMemo(
		() => [
			{
				Header: 'IPO Date',
				accessor: 'date',
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				Cell: function DateCell({ cell: { value } }) {
					return (
						<Link href={`/stocks/${value.toLowerCase()}`}>
							<a className="bll">{value}</a>
						</Link>
					);
				},
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'IPO Price',
				accessor: 'ipoPrice',
				Cell: ({ cell: { value } }) => {
					return '$' + value.toFixed(2);
				},
			},
			{
				Header: 'Current',
				accessor: 'current',
				Cell: ({ cell: { value } }) => {
					return '$' + value.toFixed(2);
				},
			},
			{
				Header: 'Return',
				accessor: 'return',
				sortType: 'basic',
				Cell: ({ cell: { value } }) => {
					let fixed = value.toFixed(2) + '%';
					if (value > 0) {
						return <span className="text-[green]">{fixed}</span>;
					} else if (value < 0) {
						return <span className="text-[red]">{fixed}</span>;
					} else {
						return <span className="text-gray-800">{fixed}</span>;
					}
				},
			},
		],
		[]
	);

	const data = useMemo(() => rawdata, [rawdata]);

	const tableInstance = useTable({ columns, data }, useSortBy);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<div className="overflow-x-auto">
			<table
				{...getTableProps()}
				className={`${styles.ipotable} ${styles.striped}`}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(
										column.getSortByToggleProps()
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
	);
};

export default IPOTable;
