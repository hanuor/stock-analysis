import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { screenerState } from 'components/StockScreener/screener.state';
import { useEffect, useMemo } from 'react';
import {
	useTable,
	useSortBy,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { ResultsMenu } from '../ResultsMenu/ResultsMenu';
import { TablePagination } from './TablePagination';
import { filterItems } from 'components/StockScreener/functions/filterItems';
import { FilterId } from 'components/StockScreener/screener.types';
import {
	useFetchFullData,
	useFetchFulIPOData,
} from 'components/StockScreener/functions/useFetchFullData';
import { Loading } from 'components/Loading';

interface Props {
	cols: any;
	type: string;
}

export function ResultsTable({ cols, type }: Props) {
	const rows = screenerDataState((state) => state.data);
	const fullyLoaded = screenerDataState((state) => state.fullyLoaded);
	const fetchFullData = useFetchFullData();
	const fetchFullIPOData = useFetchFulIPOData();
	const filters = screenerState((state) => state.filters);
	const tablePage = screenerState((state) => state.tablePage);
	const tableSize = screenerState((state) => state.tableSize);
	const showColumns = screenerState((state) => state.showColumns);
	const setShowColumns = screenerState((state) => state.setShowColumns);
	const setFetchedColumns = screenerState((state) => state.setFetchedColumns);

	useEffect(() => {
		if (type == 'stock') {
			fetchFullData();
			setShowColumns([
				's',
				'n',
				'm',
				'p',
				'c',
				'se',
				'v',
				'pe',
			] as FilterId[]);
			setFetchedColumns(['s', 'n', 'm', 'p', 'c', 'se', 'v', 'pe']);

			// eslint-disable-next-line react-hooks/exhaustive-deps
		} else {
			fetchFullIPOData();
			setShowColumns([
				's',
				'n',
				'm',
				'se',
				'ipoPriceRange',
				'ipoDate',
				'revenue',
			] as FilterId[]);
			setFetchedColumns([
				's',
				'n',
				'm',
				'se',
				'ipoPriceRange',
				'ipoDate',
				'revenue',
			]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const data = useMemo(() => filterItems(rows, filters), [rows, filters]);
	const columns = useMemo(() => cols, [cols]);

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
			data,
			initialState: {
				pageIndex: tablePage,
				pageSize: tableSize,
				hiddenColumns: columns
					.filter((col: any) => !showColumns.includes(col.accessor))
					.map((col: any) => col.accessor),
			},
			autoResetSortBy: false,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	if (!fullyLoaded) {
		return (
			<div className="h-[600px] mt-6">
				<Loading />
			</div>
		);
	}

	return (
		<>
			<ResultsMenu
				type={type}
				count={data.length}
				title="Matches"
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				tableId="screener-table"
			/>
			<div className="overflow-x-auto">
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
													<SortDownIcon classes="h-4 w-4 text-gray-800" />
												) : (
													<SortUpIcon classes="h-4 w-4 text-gray-800" />
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
