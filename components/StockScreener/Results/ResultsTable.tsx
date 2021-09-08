import { SingleStock } from 'components/StockScreener/screener.types';
import { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';

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
		useSortBy,
		usePagination
	);

	return (
		<div className="overflow-x-auto">
			<div>{rowdata.length} results</div>
			<table className="symbol-table w-full mt-3">
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr key={index}>
							{headerGroup.headers.map((column, index) => (
								<th
									{...column.getSortByToggleProps({
										title: `Sort by: ${column.Header}`,
									})}
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
