import { useTable } from 'react-table';
import styles from './IPOTable.module.css';

const columns = [
	{
		Header: 'IPO Date',
		accessor: 'date',
	},
	{
		Header: 'Symbol',
		accessor: 'symbol',
	},
	{
		Header: 'Name',
		accessor: 'name',
	},
	{
		Header: 'IPO Price',
		accessor: 'ipoPrice',
	},
	{
		Header: 'Current',
		accessor: 'current',
	},
	{
		Header: 'Return',
		accessor: 'return',
	},
];

const IPOTable = ({ data }) => {
	const tableInstance = useTable({ columns, data });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<table
			{...getTableProps()}
			className={`${styles.ipotable} ${styles.striped}`}>
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
	);
};

export default IPOTable;
