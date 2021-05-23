/* eslint-disable react/display-name */
// xtodo: Hover charts
// xtodo: Tooltips and titles
// todo: Export functionality
// todo: Left/right switch
// todo: Add more metrics
// todo: Optimize styling
// ? Add a menu that allows formatting by millions/thousands/raw
// ? Add an option to show "current/ttm"
// ? Add data disclaimers
// ? Add link to 10K/10Q?
// ? Link to financial statement definitions?
// ? Add easy symbol switch
// ? Include formats in export: csv, plain text, pdf
// ? Add print button?
// ? Make left column sticky
// ! Make sure to optimize numbers for stocks that do not report in USD, such as BABA
// ! Remove growth numbers if either is negative
// ! Ratios: get rid of empty columns (first two usually)
// todo: Enable export and left-right functionality @AZID

import { forwardRef } from "react";
import { financialsState } from "@State/financialsState";
import { stockState } from "@State/stockState";
import userState from "@State/userState";
import {
	formatNumber,
	formatYear,
	redOrGreen,
	getPeriodLabel,
	getPeriodTooltip,
} from "@/Functions/financials.functions";
import { HoverChartIcon } from "@/components/Icons";
import styles from "@/Styles/Table.module.css";
import mapData from "@Data/financials_data_map";
import HoverChart from "@/components/Stocks/HoverChart";
import Tippy from "@tippyjs/react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import TableTitle from "./FinancialTable/TableTitle";
import TableControls from "./FinancialTable/TableControls";

export default function FinancialTable() {
	const range = financialsState((state) => state.range);
	const statement = financialsState((state) => state.statement);
	const divider = financialsState((state) => state.divider);
	const financialData = financialsState((state) => state.financialData);
	const info = stockState((state) => state.info);
	const isLoggedIn = userState((state) => state.isLoggedIn);

	const data =
		statement === "ratios" && range === "quarterly"
			? financialData.ratios.trailing
			: financialData[statement][range]; // The data for the selected financial statement

	let paywall = range === "annual" ? 15 : 40;
	const count =
		!isLoggedIn && data.datekey.length > paywall
			? paywall
			: data.datekey.length; // How many data columns
	const data_map = mapData(statement);

	const HeaderRow = () => {
		return data.datekey.map((cell, index) => {
			if (index > count) {
				return;
			}
			return (
				<th key={index} title={cell}>
					{range === "annual" ? formatYear(cell) : cell}
				</th>
			);
		});
	};

	const RowTitle = forwardRef((props, ref) => {
		return (
			<span ref={ref} className="cursor-help">
				{props.title}
			</span>
		);
	});

	const IndicatorTooltip = ({ row }) => {
		return (
			<div>
				<h4 className="text-xl font-semibold mb-2">{row.title}</h4>
				<div className="border-t border-gray-300 pt-2">{row.tooltip}</div>
				{row.formula && (
					<div className="text-sm border-t border-gray-300 mt-3 pt-2">
						{row.formula}
					</div>
				)}
			</div>
		);
	};

	const ChartIcon = forwardRef((props, ref) => {
		return (
			<div ref={ref} className={styles.iconcelldiv} tabIndex={0}>
				<HoverChartIcon />
			</div>
		);
	});

	const BodyRow = ({ row }) => {
		let id = row.id;
		let dataid = row.data || row.id;
		let format = row.format || "standard";
		let rowdata = data[dataid];
		let offset = range === "annual" ? 1 : 4;
		let total = 0;

		let dataRows = rowdata.map((cell, index) => {
			if (index > count) {
				return;
			}

			let prev = format === "growth" ? data[dataid][index + offset] : null;
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

			if (cell != 0 && cellContent != "-") {
				total++;
			}

			return (
				<td key={index} title={titleTag} className={cellClass()}>
					{cellContent}
				</td>
			);
		});

		if (total == 0) {
			return null;
		}
		return (
			<tr>
				<td>
					<Tippy
						content={<IndicatorTooltip row={row} />}
						theme="light"
						delay={100}
						className={styles.bigTooltipText}>
						<RowTitle title={row.title} />
					</Tippy>
				</td>
				<td className={styles.iconcell}>
					<HeadlessTippy
						render={(attrs) => (
							<div
								className="bg-white border border-gray-200 p-2 md:py-2 md:px-3 h-[40vh] w-[95vw] md:h-[330px] md:w-[600px] z-40"
								tabIndex="-1"
								{...attrs}>
								<HoverChart
									data={data}
									count={count}
									row={row}
									range={range}
									ticker={info.ticker}
									divider={divider}
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
			<div className="flex flex-row justify-between items-end">
				<TableTitle />
				<TableControls />
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
							<th>
								<Tippy
									content={getPeriodTooltip(range)}
									theme="light"
									delay={100}
									className={styles.bigTooltipText}>
									<RowTitle title={getPeriodLabel(range)} />
								</Tippy>
							</th>
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
