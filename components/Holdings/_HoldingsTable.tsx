import { Holding } from 'types/Holdings';
import { useTable, usePagination, Column } from 'react-table';
import { useMemo } from 'react';
import styles from './HoldingsTable.module.css';
import { HoldingsPaywall } from './HoldingsPaywall';
import { StockLink, ETFLink } from 'components/Links';
import { authState } from 'state/authState';

export const HoldingsTable = ({ rawdata }: { rawdata: Holding[] }) => {
	const isPro = authState((state) => state.isPro);
	const count = rawdata.length;

	let showData: Holding[];
	if (isPro) {
		showData = rawdata;
	} else {
		showData = rawdata.slice(0, 200);
	}

	type CellString = {
		cell: {
			value: string;
		};
	};

	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'No.',
				accessor: 'no',
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				Cell: function FormatCell({ cell: { value } }: CellString) {
					if (value.startsWith('$')) {
						return <StockLink symbol={value.slice(1)} />;
					} else if (value.startsWith('#')) {
						return <ETFLink symbol={value.slice(1)} />;
					}
					return value;
				},
			},
			{
				Header: 'Company Name',
				accessor: 'name',
			},
			{
				Header: '% Assets',
				accessor: 'assets',
			},
			{
				Header: 'Shares',
				accessor: 'shares',
			},
		],
		[]
	);

	const data = useMemo(() => showData, [showData]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			usePagination
		);

	return (
		<>
			<div className="overflow-x-auto">
				<table {...getTableProps()} className={styles.table}>
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
			{!isPro && <HoldingsPaywall total={count} />}
		</>
	);
};
