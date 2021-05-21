/* eslint-disable react/display-name */
// todo: Hover charts
// todo: Tooltips and titles
// todo: Export functionality
// todo: Left/right switch
// todo: Add more metrics
// ? Add a menu that allows formatting by millions/thousands/raw

import { useContext, forwardRef } from "react";
import { financialsState } from "@State/financialsState";
import PageContext from "@/components/Context/PageContext";
import StateContext from "@/components/Context/StateContext";
import { formatNumber, formatDate } from "@/Functions/formatNumber";
import { redOrGreen, getTitle } from "@/Functions/financials.functions";
import { HoverChartIcon } from "@/components/Icons";
import styles from "@/Styles/Table.module.css";
import mapData from "@Data/financials_data_map";
import Tippy from "@tippyjs/react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import HoverChart from "@/components/Stocks/HoverChart";

export default function FinancialTable({ props }) {
	const range = financialsState((state) => state.range);
	const statement = financialsState((state) => state.statement);
	const appState = useContext(StateContext);
	const fullData = useContext(PageContext);

	const data = fullData[statement][range]; // The data for the selected financial statement

	let paywall = range === "annual" ? 15 : 40;
	const count =
		!appState.isLoggedIn && data.datekey.length > paywall
			? paywall
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

	const RowTitle = forwardRef((props, ref) => {
		return <span ref={ref}>{props.title}</span>;
	});

	const ChartIcon = forwardRef((props, ref) => {
		return (
			<span ref={ref} className="z-50">
				<HoverChartIcon />
			</span>
		);
	});

	const BodyRow = ({ row }) => {
		let id = row.id;
		let dataid = row.data || row.id;
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
				<td>
					<Tippy content={row.tooltip}>
						<RowTitle title={row.title} />
					</Tippy>
				</td>
				<td>
					<HeadlessTippy
						render={(attrs) => (
							<div
								className="bg-white border border-gray-200 p-3 h-[40vh] w-[95vw] md:h-[330px] md:w-[600px] z-40"
								tabIndex="-1"
								{...attrs}>
								<HoverChart
									data={data}
									count={count}
									row={row}
									range={range}
									ticker={props.ticker}
								/>
							</div>
						)}
						delay={100}
						interactive="true"
						offset={[150, -1]}
						popperOptions={{
							modifiers: [{ name: "flip", enabled: false }],
						}}
						trigger="mouseenter focus click"
						zIndex={30}>
						<ChartIcon />
					</HeadlessTippy>
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
