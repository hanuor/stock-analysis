/* eslint-disable react/jsx-key */
// Used on the /stocks/ and /etf/ index pages
import { useMemo } from 'react';
import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	Column,
} from 'react-table';
import styles from './SymbolTable.module.css';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';
import { GlobalFilter } from 'components/Tables/GlobalFilter';

interface StockType {
	s: string;
	n: string;
	cls?: string;
	aum?: number;
	ind?: string;
	mcap?: number;
}

interface Props {
	title: string;
	columndata: Column[];
	rowdata: StockType[];
}

export const SymbolTable = ({ title, columndata, rowdata }: Props) => {
	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => rowdata, [rowdata]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
		setGlobalFilter,
		state: { globalFilter },
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy
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
					className={[styles.table, styles.table_striped].join(' ')}
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
		</>
	);
};
