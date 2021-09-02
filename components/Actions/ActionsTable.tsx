import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	Column,
} from 'react-table';
import { useState, useEffect, useMemo } from 'react';
import { Controls } from 'components/Controls/_Controls';
import styles from './ActionsTable.module.css';
import { authState } from 'state/authState';
import { getActionsDataFull } from 'functions/callBackEnd';
import { actionsState } from 'state/actionsState';

interface Props {
	title: string;
	columndata: Column<object>[];
	rowdata: object[];
	fullCount: number;
	type: string;
	year?: string;
}

export const ActionsTable = ({
	title,
	columndata,
	rowdata,
	fullCount,
	type,
	year,
}: Props) => {
	const [dataRows, setDataRows] = useState(rowdata);
	const isPro = authState((state) => state.isPro);

	const count = rowdata.length;

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullActions() {
			const res = await getActionsDataFull(type, year);

			if (res.data && res.data.length > count) {
				setDataRows(res.data);
			} else {
				throw new Error(
					'Unable to fetch full data, response was invalid or empty array'
				);
			}
		}

		if (isPro && fullCount > count) {
			fetchFullActions();
		}
	}, [fullCount, isPro, count, year, type]);

	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => dataRows, [dataRows]);
	console.log(columns);
	console.log(data);
	const filter = actionsState((state) => state.filter);
	const setFilter = actionsState((state) => state.setFilter);

	const { headerGroups, prepareRow, rows, setGlobalFilter } = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter
	);

	const setDualFilter = (filterValue: string) => {
		setGlobalFilter(filterValue);
		setFilter(filterValue);
	};

	return (
		<>
			<Controls
				count={fullCount}
				title={title}
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={filter}
				setGlobalFilter={setDualFilter}
			/>
			<div className="overflow-x-auto">
				<table className={styles.actionstable} id="actions-table">
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
};
