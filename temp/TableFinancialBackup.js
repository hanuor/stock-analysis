/* eslint-disable react/display-name */
// todo: Hover charts
// todo: Tooltips and titles
// todo: Export functionality
// todo: Left/right switch
// todo: Add more metrics
// ? Add a menu that allows formatting by millions/thousands/raw

import { useContext, useMemo } from "react";
import { useTable } from "react-table";
import { financialsState } from "@State/financialsState";
import PageContext from "@/components/Context/PageContext";
import StateContext from "@/components/Context/StateContext";
import { formatNumber, formatDate } from "@/Functions/formatNumber";
import { redOrGreen, setBorder } from "@/Functions/financials.functions";
import { HoverChartIcon } from "@/components/Icons";
import styles from "@/Styles/Table.module.css";
import mapData from "@Data/financials_data_map";

export default function FinancialTable() {
	const range = financialsState((state) => state.range);
	const statement = financialsState((state) => state.statement);
	const appState = useContext(StateContext);
	const fullData = useContext(PageContext);

	const statementData = fullData[statement][range]; // The data for the selected financial statement
	const count =
		!appState.isLoggedIn && statementData.datekey.length > 15
			? 15
			: statementData.datekey.length; // How many data columns
	const divider = "millions"; // Can change to millions and raw dynamically
	const data_map = mapData(statement);

	const columns = useMemo(() => {
		const columnArray = [];

		for (let i = 0; i < count; i++) {
			const rawDate = statementData.datekey[i];
			let formattedDate = range === "annual" ? formatDate(rawDate) : rawDate;

			columnArray[i] = {
				Header: formattedDate,
				accessor: `${i}`,
				Cell: (row) => <span title={row.column.id}>{row.value}</span>,
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
	}, [range, statement]);

	const data = useMemo(() => {
		const dataArray = [];
		const offset = range === "annual" ? 1 : 4;
		data_map.map(function (row) {
			const data_row = {};
			let total = 0; // if all the rows are 0, then skip the row
			data_row["title"] = row.title;

			for (let i = 0; i < count; i++) {
				let item = row.data
					? statementData[row.data][i]
					: statementData[row.id][i];
				let prev =
					row.format === "growth"
						? statementData[row.data][i + offset]
						: null;
				let revenue =
					row.format === "margin" ? statementData["revenue"][i] : null;

				data_row[i] = formatNumber({
					type: row.format || "standard",
					current: item,
					previous: prev,
					revenue: revenue,
					divider,
				});

				total = total + item;
			}

			// if (total !== 0 || row.title === "revenue") {
			dataArray.push(data_row);
			// }
		});

		return dataArray;
	}, [range, statement]);

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

	const getTitle = (statement, range) => {
		let rangeTitle = range.charAt(0).toUpperCase() + range.slice(1);

		switch (statement) {
			case "balance_sheet":
				return `Balance Sheet (${rangeTitle})`;

			case "cash_flow_statement":
				return `Cash Flow Statement (${rangeTitle})`;

			case "ratios":
				return `Ratios and Metrics (${rangeTitle})`;

			default:
				return `Income Statement (${rangeTitle})`;
		}
	};

	return (
		<div className="px-4 lg:px-6 mx-auto">
			<h1 className="text-2xl font-bold mb-3">
				{getTitle(statement, range)}
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
