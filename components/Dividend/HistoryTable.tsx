import { DividendType } from 'types/Dividend';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { Export } from 'components/Controls/Export';
import styles from './HistoryTable.module.css';

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 5,
});

type Props = {
	rawdata: DividendType[];
	disclaimer?: boolean;
};

export const HistoryTable = ({ rawdata, disclaimer }: Props) => {
	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'Ex-Dividend Date',
				accessor: 'exDate',
			},
			{
				Header: 'Cash Amount',
				accessor: 'amount',
				Cell: ({ cell: { value } }: any) => {
					return '$' + formatter.format(value);
				},
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

	const { headerGroups, rows, prepareRow } = tableInstance;

	return (
		<div className="mt-4 bp:mt-7">
			<div className="sm:flex flex-row justify-between px-1 items-end mb-2 sm:mb-1">
				<h2 className="hh2 mb-0.5 sm:mb-2">Dividend History</h2>
				<div className="pb-0.5">
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
						tableId="dividend-table"
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className={styles.table} id="dividend-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th key={index}>
										{column.render('Header') ===
										'Ex-Dividend Date' ? (
											<div>
												Ex-Div
												<span className="hidden sm:inline">
													idend
												</span>{' '}
												Date
											</div>
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
					<tbody>
						{rows.map((row, index) => {
							prepareRow(row);
							return (
								<tr key={index}>
									{row.cells.map((cell, index) => {
										return <td key={index}>{cell.render('Cell')}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				{disclaimer && (
					<div className="mt-1 text-sm text-gray-600">
						* Dividend amounts are adjusted for stock splits when
						applicable.
					</div>
				)}
			</div>
		</div>
	);
};
