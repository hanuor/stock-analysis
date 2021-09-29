import { DividendType } from 'types/Dividend';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { Export } from 'components/Controls/Export';
import styles from './HistoryTable.module.css';

export const HistoryTable = ({ rawdata }: { rawdata: DividendType[] }) => {
	const columns: Column[] = useMemo(
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
				<div className="pb-1">
					<span>
						<Export
							title="Export"
							buttons={[
								{
									title: 'Export to Excel',
									type: 'xlsx',
									restricted: true,
								},
								{
									title: 'Export to CSV',
									type: 'csv',
									restricted: true,
								},
							]}
							tableId={'dividend-table'}
						/>
					</span>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={styles.table}
					id="dividend-table"
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column, index) => (
									<th {...column.getHeaderProps()} key={index}>
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
		</div>
	);
};
