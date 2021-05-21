/* eslint-disable react/display-name */
// todo: Hover charts
// todo: Tooltips and titles
// todo: Export functionality
// todo: Left/right switch
// todo: Add more metrics
// ? Add a menu that allows formatting by millions/thousands/raw

import { useContext, useState } from "react";
import { financialsState } from "@State/financialsState";
import PageContext from "@/components/Context/PageContext";
import StateContext from "@/components/Context/StateContext";
import { formatNumber, formatDate } from "@/Functions/formatNumber";
import { redOrGreen, getTitle } from "@/Functions/financials.functions";
import HoverChart from "@/Functions/hoverCharts";
import { HoverChartIcon } from "@/components/Icons";
import styles from "@/Styles/Table.module.css";
import mapData from "@Data/financials_data_map";

export default function FinancialTable() {
	const range = financialsState((state) => state.range);
	const statement = financialsState((state) => state.statement);
	const appState = useContext(StateContext);
	const fullData = useContext(PageContext);
	const [hoverChartActive, setHoverChartActive] = useState(false);
	const [hoverChartRow, setHoverChartRow] = useState();

	const data = fullData[statement][range]; // The data for the selected financial statement
	const count =
		!appState.isLoggedIn && data.datekey.length > 15
			? 15
			: data.datekey.length; // How many data columns
	const divider = "millions"; // Can change to millions and raw dynamically
	const data_map = mapData(statement);

	const HeaderRow = () => {
		return data.datekey.map((cell, index) => {
			if (index > count) {
				return;
			}
			return (
				<th key={index}>{range === "annual" ? formatDate(cell) : cell}</th>
			);
		});
	};

	const BodyRow = ({ row }) => {
		let id = row.id;
		let dataid = row.data || row.id;
		let title = row.title;
		let format = row.format || "standard";
		let rowdata = data[dataid];

		let dataRows = rowdata.map((cell, index) => {
			if (index > count) {
				return;
			}

			let prev = format === "growth" ? data[dataid][index + 1] : null;
			let rev = format === "margin" ? data.revenue[index] : null;

			let titleTag = formatNumber({
				type: row.format || "standard",
				current: cell,
				previous: prev,
				revenue: rev,
				divider: "raw",
			});

			let cellContent = formatNumber({
				type: row.format || "standard",
				current: cell,
				previous: prev,
				revenue: rev,
				divider,
			});

			let cellClass = () => {
				if (format === "growth") {
					return redOrGreen(cellContent, id);
				}
			};

			return (
				<td key={index} title={titleTag} className={cellClass()}>
					{cellContent}
				</td>
			);
		});

		return (
			<tr>
				<td>{title}</td>
				<td>
					<span
						onMouseEnter={() => {
							console.log("enter");
							setHoverChartActive(true);
							setHoverChartRow(row);
						}}
						onMouseLeave={() => {
							console.log("leave");
							setHoverChartActive(false);
							setHoverChartRow(null);
						}}>
						<HoverChartIcon />
					</span>
				</td>
				{dataRows}
			</tr>
		);
	};

	return (
		<div className="px-4 lg:px-6 mx-auto">
			<h1 className="text-2xl font-bold mb-3">
				{getTitle(statement, range)}
			</h1>
			<div className="hover-chart">
				{hoverChartActive && <HoverChart row={hoverChartRow} />}
			</div>
			<div className="overflow-x-auto">
				<table
					className={[
						styles.table,
						styles.table_striped,
						styles.table_financial,
					].join(" ")}>
					<thead>
						<tr>
							<th>Period</th>
							<th></th>
							<HeaderRow />
						</tr>
					</thead>
					<tbody>
						{data_map.map((row, index) => {
							return <BodyRow row={row} key={index} />;
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
