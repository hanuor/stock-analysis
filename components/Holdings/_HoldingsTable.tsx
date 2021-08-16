import { Holding } from 'types/Holdings';
import { useTable, Column } from 'react-table';
import { useMemo } from 'react';
import styles from './HoldingsTable.module.css';
import { HoldingsPaywall } from './HoldingsPaywall';
import { StockLink, ETFLink } from 'components/Links';
import { authState } from 'state/authState';

export const HoldingsTable = ({ rawdata }: { rawdata: Holding[] }) => {
	const isPro = authState((state) => state.isPro);
	const count = rawdata.length;

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

	const data = useMemo(() => rawdata, [rawdata]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	return (
		<>
			<div className="overflow-x-auto">
				<table {...getTableProps()} className={styles.table}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr
								{...headerGroup.getHeaderGroupProps()}
								key={data[index].symbol}
							>
								{headerGroup.headers.map((column, index) => (
									<th
										{...column.getHeaderProps()}
										key={data[index].symbol}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, index) => {
							// Stop at 200 if not Pro member
							if (index + 1 > 200 && !isPro) {
								return;
							}
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={data[index].symbol}>
									{row.cells.map((cell, index) => {
										return (
											<td
												{...cell.getCellProps()}
												key={data[index].symbol}
											>
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
