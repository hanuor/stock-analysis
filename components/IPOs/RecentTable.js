import { useTable, useSortBy } from 'react-table';
import styles from './Table.module.css';
import { StockLink } from 'components/Links';
import { useMemo } from 'react';
import { SortUp, SortDown } from 'components/Icons';

const RecentTable = ({ rawdata }) => {
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
					return <StockLink symbol={value} />;
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
					const fixed = value.toFixed(2) + '%';
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
				className={`${styles.ipotable} ${styles.striped}`}
			>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<th
									{...column.getHeaderProps(
										column.getSortByToggleProps({
											title: `Sort by: ${column.Header}`,
										})
									)}
									key={index}
								>
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
					{rows.map((row, index) => {
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
	);
};

export default RecentTable;
