import styles from './Actions.module.css';
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	Column,
} from 'react-table';
import { useMemo } from 'react';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { Pagination } from 'components/Tables/Pagination';
import { GlobalFilter } from 'components/Tables/GlobalFilter';

interface Props {
	title: string;
	columndata: Column<object>[];
	rowdata: object[];
}

export const ActionsTable = ({ title, columndata, rowdata }: Props) => {
	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => rowdata, [rowdata]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		rows,
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
				pageIndex: 0,
				pageSize: 200,
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<>
			<div className="flex flex-row items-end justify-between space-x-4 mb-2 px-0.5 xs:px-1">
				<span className="text-lg xs:text-xl sm:text-2xl font-semibold mb-1 whitespace-nowrap">
					{rows.length} {title}
				</span>
				<div className="">
					<GlobalFilter
						useAsyncDebounce={useAsyncDebounce}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={`${styles.actionstable} ${styles.striped}`}
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
						{page.map((row, index) => {
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
			<Pagination
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
};
