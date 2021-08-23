import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	Column,
} from 'react-table';
import { useMemo } from 'react';
import { Controls } from '../Controls/_Controls';
import { ActionsPaywall } from './ActionsPaywall';
import styles from './ActionsTable.module.css';
import { authState } from 'state/authState';
import { navState } from 'state/navState';

interface Props {
	title: string;
	columndata: Column<object>[];
	rowdata: object[];
}

export const ActionsTable = ({ title, columndata, rowdata }: Props) => {
	const isPro = authState((state) => state.isPro);
	const path = navState((state) => state.path);

	const count = rowdata.length;
	const last = path.three ?? path.two ?? path.one;
	const current = new Date().getFullYear();

	const showPaywall =
		!isPro &&
		Number(last) !== current &&
		(last?.includes('20') || last?.includes('19')) &&
		count > 100
			? true
			: false;

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
		useGlobalFilter
	);

	return (
		<>
			<Controls
				count={rows.length}
				title={title}
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
			<div className={`overflow-x-auto ${styles[title.toLowerCase()]}`}>
				<table {...getTableProps()} className={styles.actionstable}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column, index) => (
									<th {...column.getHeaderProps()} key={index}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, index) => {
							// End early if paywalled
							if (index + 1 > 100 && showPaywall) {
								return;
							}
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
			{showPaywall && <ActionsPaywall total={count} title={title} />}
		</>
	);
};
