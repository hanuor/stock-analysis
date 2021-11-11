/* eslint-disable react/display-name */
import {
	FinancialsType,
	FinancialsMapType,
	FinancialReport,
	Statement,
} from 'types/Financials';
import { Info } from 'types/Info';
import { useState, useEffect, forwardRef, useMemo } from 'react';
import { financialsState } from 'state/financialsState';
import { authState } from 'state/authState';
import {
	formatCell,
	formatYear,
	redOrGreen,
	getPeriodLabel,
	getPeriodTooltip,
	sliceData,
	reverseData,
} from './FinancialTable.functions';
import { HoverChartIcon } from 'components/Icons/HoverChart';
import styles from './FinancialTable.module.css';
import { TableTitle } from './TableTitle';
import { TableControls } from './TableControls';
import Paywall from './Paywall';
import dynamic from 'next/dynamic';
import { Tooltip } from './Tooltip';
import { TooltipChart } from './TooltipChart';
import { Unavailable } from 'components/Unavailable';
import { getStockFinancialsFull } from 'functions/callBackEnd';
import { FinancialSource } from './FinancialSource';

const HoverChart = dynamic(() => import('./HoverChart'), { ssr: false });

interface Props {
	statement: Statement;
	financials: FinancialsType;
	info: Info;
	map: FinancialsMapType[];
	counts: {
		annual: number;
		quarterly: number;
		trailing: number;
	};
}

export const FinancialTable = ({
	statement,
	financials,
	info,
	map,
	counts,
}: Props) => {
	const range = financialsState((state) => state.range);
	const divider = financialsState((state) => state.divider);
	const leftRight = financialsState((state) => state.leftRight);
	const reversed = financialsState((state) => state.reversed);
	const setReversed = financialsState((state) => state.setReversed);
	const isPro = authState((state) => state.isPro);
	const [hover, setHover] = useState(false);
	const [fullData, setFullData] = useState<FinancialsType>();
	const [dataRows, setDataRows] = useState(
		financials[range as keyof FinancialsType]
	);

	// Check if financial data is paywalled
	const paywall = range === 'annual' ? 10 : 40;
	const fullcount = counts[range]; // The total number of years/quarters available
	const showcount = !isPro && fullcount > paywall ? paywall : fullcount; // How many years/quarter to show
	const paywalled = showcount < fullcount ? 'true' : false;

	useEffect(() => {
		setDataRows(financials[range as keyof FinancialsType]);
	}, [financials, range]);

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullFinancials() {
			const res = fullData
				? fullData
				: await getStockFinancialsFull(statement, info.id);
			if (res && res[range]?.datekey?.length > paywall) {
				setFullData(res);
				setDataRows(res[range]);
			} else {
				throw new Error(
					'Unable to fetch full data, response was invalid or empty array'
				);
			}
		}

		if (isPro && fullcount > paywall) {
			fetchFullFinancials();
		}
	}, [info.id, isPro, fullcount, paywall, statement, range, fullData]);

	let data = useMemo(
		() => sliceData(dataRows, showcount),
		[dataRows, showcount]
	);

	// Switch data left/right if applicable
	if (
		(leftRight === 'right' && !reversed) ||
		(leftRight === 'left' && reversed)
	) {
		data = reverseData(data);
		setReversed(!reversed);
	}

	// If count is empty, show message
	if (
		showcount === 0 ||
		(statement === 'ratios' && info.exceptions.hideRatios)
	) {
		return (
			<>
				<div className="">
					<TableTitle statement={statement} />
					<Unavailable
						message={`No ${range} ${statement.replace(
							/_/g,
							' '
						)} data available for this stock.`}
						classes="min-h-[300px] lg:min-h-[500px]"
					/>
				</div>
			</>
		);
	}

	const DATA_MAP = map;

	if (!data) {
		return <p>Loading...</p>;
	}

	const headerRow = () => {
		const headerdata = data.datekey;

		return headerdata.map((cell, index) => {
			return (
				<th key={index} title={cell}>
					{range === 'annual' ? formatYear(cell) : cell}
				</th>
			);
		});
	};

	interface RowTitleProps {
		title: string;
		indent?: boolean;
	}

	const RowTitle = forwardRef<HTMLSpanElement, RowTitleProps>((props, ref) => {
		const { title, indent } = props;
		const margin = indent ? ' ml-3' : '';

		return (
			<span ref={ref} className={margin}>
				{title}
			</span>
		);
	});

	const IndicatorTooltip = ({ row }: { row: FinancialsMapType }) => {
		return (
			<div>
				<h4 className="text-xl font-semibold mb-2">
					{row.tooltipTitle || row.title}
				</h4>
				<div className="border-t border-gray-300 pt-2">{row.tooltip}</div>
				{row.formula && (
					<div className="text-sm border-t border-gray-300 mt-3 pt-2">
						{row.formula}
					</div>
				)}
			</div>
		);
	};

	const ChartIcon = forwardRef<HTMLDivElement>((props, ref) => {
		return (
			<div ref={ref} className={styles.iconcelldiv}>
				<HoverChartIcon />
			</div>
		);
	});

	const BodyRow = ({ row }: { row: FinancialsMapType }) => {
		// Exception: If recent IPO and only 6 quarters, use 3 quarter offset to calculate growth
		let offs = 4;
		if (
			row.format === 'growth' &&
			(range === 'quarterly' || range === 'trailing') &&
			showcount === 6
		) {
			if (data?.datekey?.length === 6) {
				const firstDate = data.datekey[0];
				const compareDate = data.datekey[3];

				if (firstDate.split('-')[1] === compareDate.split('-')[1]) {
					offs = 3;
				}
			}
		}

		const id = row.id;
		const dataid = row.data || row.id;
		const format = row.format || 'standard';
		let offset = range === 'quarterly' || range === 'trailing' ? offs : 1;
		let total = 0;

		const rowdata = data[dataid as keyof FinancialReport];
		if (!rowdata) {
			return null;
		}
		const revenuedata = data.revenue;

		if (leftRight === 'right') {
			offset = -offset;
		}

		const dataRows = rowdata.map((cell, index) => {
			if (typeof cell === 'number') {
				const prev = format === 'growth' ? rowdata[index + offset] : null;
				const rev = format === 'margin' ? revenuedata[index] : null;

				const titleTag = formatCell({
					type: row.format || 'standard',
					current: cell,
					previous: prev,
					revenue: rev,
					divider: 'raw',
				});

				const cellContent = formatCell({
					type: row.format || 'standard',
					current: cell,
					previous: prev,
					revenue: rev,
					divider,
				});

				const cellClass = () => {
					if (format === 'growth' && cellContent) {
						return redOrGreen(cellContent, id);
					}
					return '';
				};

				if (cell != 0 && cellContent != '-') {
					total++;
				}

				return (
					<td key={index} title={titleTag} className={cellClass()}>
						{cellContent !== '-' ? (
							<span title={titleTag}>{cellContent}</span>
						) : (
							'-'
						)}
					</td>
				);
			} else {
				return <td key={index}>-</td>;
			}
		});

		const getRowStyles = () => {
			const styles = [];
			if (row.format === 'growth' || row.border) {
				styles.push(
					'border-b-2 border-gray-300 text-[0.85rem] sm:text-[0.95rem]'
				);
			}
			if (row.bold) {
				styles.push('font-semibold text-gray-800');
			}
			if (row.extrabold) {
				styles.push('font-bold text-gray-700');
			}

			return styles.join(' ');
		};

		if (total == 0) {
			return null;
		}
		return (
			<>
				<tr className={getRowStyles()}>
					<td
						className="flex flex-row justify-between items-center"
						onTouchStart={() => !hover && setHover(true)}
						onClick={() => !hover && setHover(true)}
						onMouseEnter={() => !hover && setHover(true)}
					>
						<Tooltip
							content={<IndicatorTooltip row={row} />}
							theme="light"
							delay={100}
							className={styles.bigTooltipText}
						>
							<RowTitle
								title={row.title}
								indent={row.format === 'growth' || row.indent}
							/>
						</Tooltip>
						<TooltipChart
							render={(attrs) => (
								<div
									className="bg-white border border-gray-200 p-2 md:py-2 md:px-3 h-[40vh] w-[95vw] md:h-[330px] md:w-[600px] z-20"
									tabIndex={-1}
									{...attrs}
								>
									{hover && (
										<HoverChart
											data={data}
											count={showcount}
											row={row}
											range={range}
											ticker={info.ticker}
											divider={divider}
											leftRight={leftRight}
										/>
									)}
								</div>
							)}
							delay={100}
							interactive={true}
							offset={[150, -1]}
							popperOptions={{
								modifiers: [{ name: 'flip', enabled: false }],
							}}
							trigger="mouseenter focus"
							zIndex={30}
						>
							<ChartIcon />
						</TooltipChart>
					</td>
					{dataRows}
				</tr>
			</>
		);
	};

	return (
		<div>
			<div className="flex flex-row justify-between items-end">
				<TableTitle
					statement={statement}
					currency={info.currency}
					fiscalYear={info.fiscalYear}
				/>
				<TableControls
					symbol={info.symbol}
					statement={statement}
					range={range}
				/>
			</div>
			<div
				className={
					'overflow-x-auto border border-gray-300' +
					(paywalled ? ' flex flex-row' : '')
				}
			>
				{paywalled && <div className="flex flex-row"></div>}
				<table
					className={[styles.table, styles.table_financial].join(' ')}
					id="financial-table"
				>
					<thead>
						<tr className="border-b-2 border-gray-300">
							<th className="flex flex-row justify-between items-center">
								<Tooltip
									content={getPeriodTooltip(range)}
									theme="light"
									delay={100}
									className={styles.bigTooltipText}
								>
									<RowTitle
										title={getPeriodLabel(range)}
										indent={false}
									/>
								</Tooltip>
							</th>
							{headerRow()}
						</tr>
					</thead>
					<tbody>
						{DATA_MAP.map((row, index) => {
							return <BodyRow row={row} key={index} />;
						})}
					</tbody>
				</table>
				{paywalled && !isPro && (
					<Paywall
						range={range}
						fullcount={fullcount}
						showcount={showcount}
					/>
				)}
			</div>
			<FinancialSource info={info} />
		</div>
	);
};
