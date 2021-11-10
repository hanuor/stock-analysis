// Used on the /stocks/ and /etf/ index pages
import { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { Controls } from 'components/Controls/_Controls';

interface TrendingType {
	price: number;
	name: string;
	pageviews: number;
	marketcap: number;
	change: number;
}

type Props = {
	title: string;
	columndata: Column[];
	rowdata: TrendingType[];
	append?: string;
};

/**
 * A simpler symbol table, without pagination and filters
 * @param {string} title  The title of the table, used in the export
 * @param {Column[]} columndata  The columns to display
 * @param {TrendingType[]} rowdata  The data to display
 * @return {JSX.Element}
 */
export function SymbolTableSimple({
	title,
	columndata,
	rowdata,
	append,
}: Props) {
	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => rowdata, [rowdata]);

	const { headerGroups, prepareRow, rows } = useTable(
		{
			columns,
			data,
		},
		useSortBy
	);

	return (
		<>
			<Controls
				count={rows.length}
				title={title}
				tableId="symbol-table-simple"
				append={append}
			/>
			<div className="overflow-x-auto">
				<table className="symbol-table n3-right" id="symbol-table-simple">
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
			</div>
		</>
	);
}
