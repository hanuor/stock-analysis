import { screenerState } from 'components/StockScreener/screener.state';
import { useMemo } from 'react';
import {
	useTable,
	useSortBy,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { ResultsControls } from './Controls/ResultsControls';
import { TablePagination } from './TablePagination';
import { filterItems } from 'components/StockScreener/functions/filterItems';

interface Props {
	cols: any;
}

export function ResultsTable({ cols }: Props) {
	const data = screenerState((state) => state.data);
	const filters = screenerState((state) => state.filters);
	const tablePage = screenerState((state) => state.tablePage);
	const tableSize = screenerState((state) => state.tableSize);
	const showColumns = screenerState((state) => state.showColumns);
	console.log({ showColumns });

	const rows = useMemo(() => filterItems(data, filters), [data, filters]);
	const columns = useMemo(() => cols, [cols]);
	const count = rows.length;

	const {
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		setPageSize,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data: rows,
			initialState: {
				pageIndex: tablePage,
				pageSize: tableSize,
				hiddenColumns: columns
					.filter((col: any) => !showColumns.includes(col.accessor))
					.map((col: any) => col.accessor),
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<>
			<div className="overflow-x-auto">
				<ResultsControls
					count={count}
					title="Matches"
					useAsyncDebounce={useAsyncDebounce}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
					tableId="screener-table"
				/>
				<table className="symbol-table w-full" id="screener-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column: any, index) => (
									<th
										{...column.getSortByToggleProps({
											title: `Sort by: ${
												column.name || column.Header
											}`,
										})}
										key={index}
									>
										<span className="flex flex-row items-center">
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
			<TablePagination
				previousPage={previousPage}
				canPreviousPage={canPreviousPage}
				pageIndex={pageIndex}
				pageOptions={pageOptions}
				pageSize={pageSize}
				setPageSize={setPageSize}
				nextPage={nextPage}
				canNextPage={canNextPage}
			/>
		</>
	);
}
