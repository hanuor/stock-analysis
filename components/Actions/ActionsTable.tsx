import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	Column,
	useFilters,
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
	const filter = actionsState((state) => state.filter);
	const setParamFilter = actionsState((state) => state.setFilter);
	const isPro = authState((state) => state.isPro);

	const count = rowdata.length;

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullActions() {
			const res = await getActionsDataFull(type, year);

			if (res.data && res.data.length > count) {
				setDataRows(res.data);
				if (filter) {
					setParamFilter(filter);
					setGlobalFilter(filter);
				}
			} else {
				throw new Error(
					'Unable to fetch full data, response was invalid or empty array'
				);
			}
		}

		if (isPro && fullCount > count) {
			fetchFullActions();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fullCount, isPro, count, year, type]);

	const columns = useMemo(() => columndata, [columndata]);
	const data = useMemo(() => dataRows, [dataRows]);

	const { headerGroups, prepareRow, rows, setGlobalFilter, setFilter } =
		useTable(
			{
				columns,
				data,
			},
			useFilters,
			useGlobalFilter
		);

	const setDualFilter = (filterValue: string) => {
		setGlobalFilter(filterValue);
		setParamFilter(filterValue);
	};

	return (
		<>
			<Controls
				count={rows.length}
				title={title}
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={filter}
				setGlobalFilter={setDualFilter}
				setColumnFilter={type == 'splits' ? setFilter : undefined}
				tableId="actions-table"
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
