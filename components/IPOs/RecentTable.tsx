import { useTable, useSortBy, Column } from 'react-table';
import styles from './Table.module.css';
import { StockLink } from 'components/Links';
import { useMemo } from 'react';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { IpoRecent } from 'types/IpoRecent';

interface CellString {
	cell: { value: string };
}

interface CellNumber {
	cell: { value: number };
}

export const RecentTable = ({ rawdata }: { rawdata: IpoRecent[] }) => {
	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'IPO Date',
				accessor: 'date',
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				Cell: function DateCell({ cell: { value } }: CellString) {
					if (value.startsWith('=')) {
						return value.slice(1);
					}
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
				Cell: ({ cell: { value } }: CellNumber) => {
					return '$' + value.toFixed(2);
				},
			},
			{
				Header: 'Current',
				accessor: 'current',
				Cell: ({ cell: { value } }: CellNumber) => {
					return '$' + value.toFixed(2);
				},
			},
			{
				Header: 'Return',
				accessor: 'return',
				sortType: 'basic',
				Cell: ({ cell: { value } }: CellNumber) => {
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
			<table {...getTableProps()} className={styles.ipotable}>
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
