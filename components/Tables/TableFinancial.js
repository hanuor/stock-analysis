/* eslint-disable react/display-name */
// todo: Add all the data rows
// todo: Hover charts
// todo: Tooltips
// todo: Export functionality
// todo: Left/right switch
// ? Add a menu that allows formatting by millions/thousands/raw

import { useContext, useMemo } from "react";
import { useTable } from "react-table";
import { financialsState } from "@State/financialsState";
import PageContext from "@/components/Context/PageContext";
import StateContext from "@/components/Context/StateContext";
import { formatNumber, formatDate } from "@/Functions/formatNumber";
import { redOrGreen, setBorder } from "@/Functions/formatFinancialCells";
import { HoverChartIcon } from "@/components/Icons";
import styles from "@/Styles/Table.module.css";
import mapData from "@Data/financials_data_map";

export default function FinancialTable({ type, title }) {
	const range = financialsState((state) => state.range);
	const appState = useContext(StateContext); // The data
	const raw = useContext(PageContext); // The data

	const statement = raw[type][range]; // The data for the selected financial state
	const count =
		!appState.isLoggedIn && statement.datekey.length > 15
			? 15
			: statement.datekey.length; // How many data columns
	const divider = "thousands"; // Can change to millions and raw dynamically
	const data_map = mapData(type);

	const columns = useMemo(() => {
		const columnArray = [];

		for (let i = 0; i < count; i++) {
			const rawDate = statement.datekey[i];
			let formattedDate = range === "annual" ? formatDate(rawDate) : rawDate;

			columnArray[i] = {
				Header: formattedDate,
				accessor: `${i}`,
				Cell: (row) => (
					<div>
						<span title={row.column.id}>{row.value}</span>
					</div>
				),
			};
		}
		let dateRowTitle = range == "annual" ? "Year" : "Quarter Ended";

		columnArray.unshift({
			Header: dateRowTitle,
			accessor: "title",
			Cell: (row) => (
				<div
					title={row.column.id}
					className="flex flex-row justify-between">
					<span>{row.value}</span>
					<span className="text-right">{HoverChartIcon()}</span>
				</div>
			),
		});

		return columnArray;
	}, [range]);

	const data = useMemo(() => {
		const dataArray = [];
		const offset = range === "annual" ? 1 : 4;
		data_map.map(function (row) {
			const data_row = {};
			let total = 0; // if all the rows are 0, then skip the row
			data_row["title"] = row.title;

			for (let i = 0; i < count; i++) {
				let item = statement[row.data][i];
				let prev =
					row.format === "growth" ? statement[row.data][i + offset] : null;
				let revenue =
					row.format === "margin" ? statement["revenue"][i] : null;

				data_row[i] = formatNumber({
					type: row.format,
					current: item,
					previous: prev,
					revenue: revenue,
					divider,
				});

				total = total + item;
			}

			if (total !== 0 || row.title === "revenue") {
				dataArray.push(data_row);
			}
		});

		return dataArray;
	}, [range]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	const getColumnProps = () => ({});

	const getRowProps = (row) => ({
		style: {
			borderBottom: setBorder(row.cells[0].value),
		},
	});

	const getCellProps = (cellInfo) => ({
		onClick: () => console.log(cellInfo),
		style: {
			color: redOrGreen(cellInfo.row.cells[0].value, cellInfo.value),
		},
	});

	return (
		<div className="px-4 lg:px-6 mx-auto">
			<h1 className="text-2xl font-bold mb-3">
				{title} ({range.charAt(0).toUpperCase() + range.slice(1)})
			</h1>
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={[
						styles.table,
						styles.table_striped,
						styles.table_financial,
					].join(" ")}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps([
											getColumnProps(column),
										])}>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps(getRowProps(row))}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps([
													getCellProps(cell),
												])}>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
