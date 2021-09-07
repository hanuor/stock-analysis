import { SingleStock } from 'components/StockScreener/screener.types';
import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

interface Props {
	rowdata: SingleStock[];
	cols: any;
}

export function ResultsTable({ rowdata, cols }: Props) {
	const data = useMemo(() => rowdata, [rowdata]);
	const columns = useMemo(() => cols, [cols]);

	const { headerGroups, page, prepareRow } = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: 25,
			},
		},
		usePagination
	);

	return (
		<div className="overflow-x-auto">
			<table className="symbol-table w-full mt-3">
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr key={index}>
							{headerGroup.headers.map((column, index) => (
								<th key={index}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{page.map((row, index) => {
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
		</div>
	);
}
