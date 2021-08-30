import { Holding } from 'types/Holdings';
import { useTable, Column } from 'react-table';
import { useState, useEffect, useMemo } from 'react';
import styles from './HoldingsTable.module.css';
import { StockLink, ETFLink } from 'components/Links';
import { authState } from 'state/authState';
import { getPageDataFull } from 'functions/callBackEnd';

type CellString = {
	cell: {
		value: string;
	};
};

interface Props {
	symbol: string;
	rawdata: Holding[];
	fullCount: number;
}

export const HoldingsTable = ({ symbol, rawdata, fullCount }: Props) => {
	const [dataRows, setdataRows] = useState(rawdata);
	const isPro = authState((state) => state.isPro);

	const count = rawdata.length;

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullHoldings() {
			const res = await getPageDataFull('holdings', symbol);

			if (res && res.data.list && res.data.list.length > count) {
				setdataRows(res.data.list);
			} else {
				throw new Error(
					'Unable to fetch full data, response was invalid or empty array'
				);
			}
		}

		if (isPro && fullCount > count) {
			fetchFullHoldings();
		}
	}, [count, fullCount, isPro, symbol]);

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

	const data = useMemo(() => dataRows, [dataRows]);

	const { headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});

	return (
		<>
			<div className="overflow-x-auto">
				<table className={styles.table}>
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
