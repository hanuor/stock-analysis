/* eslint-disable no-mixed-spaces-and-tabs */
import { FinancialReport, FinancialsMapType } from 'types/Financials';
import { Bar, defaults } from 'react-chartjs-2';
import {
	formatY,
	formatNumber,
	formatYear,
	countDecimals,
	reducePrecisionFix,
} from './FinancialTable.functions';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

interface Props {
	data: FinancialReport;
	count: number;
	row: FinancialsMapType;
	range: string;
	ticker: string;
	divider: string;
}

export const HoverChart = ({
	data,
	count,
	row,
	range,
	ticker,
	divider,
}: Props) => {
	const rangeUppercase = range.charAt(0).toUpperCase() + range.slice(1);
	const dataid = row.data || row.id;
	const rowdata = data[dataid as keyof FinancialReport];
	const type = row.format;

	const y = rowdata.map((curr, index) => {
		const offset = range === 'quarterly' ? 4 : 1;
		const previous = row.format === 'growth' ? rowdata[index + offset] : null;
		const revenue = row.format === 'margin' ? data.revenue[index] : null;
		const current = curr as number;

		const cellContent =
			type && type !== 'reduce_precision'
				? formatNumber({
						type,
						current,
						previous,
						revenue,
						divider,
				  })
				: current;

		return typeof cellContent === 'string'
			? parseFloat(cellContent)
			: cellContent;
	});

	// Format dates as years if annual
	let xdatadraft: Array<number | string> = data.datekey.slice(0, count);
	if (range === 'annual') {
		xdatadraft = xdatadraft.map((item) => {
			return formatYear(item);
		});
	}
	const xdata = xdatadraft;
	const ydata = y.slice(0, count);

	const xaxis = xdata.reverse();
	const yaxis = ydata.reverse();

	// Cut zero values from start of data array
	const ylength = yaxis.length;
	for (let i = 0; i < ylength; i++) {
		if (!yaxis[0]) {
			yaxis.shift();
			xaxis.shift();
		} else {
			break;
		}
	}

	const chartType = type === 'ratio' || type === 'percentage' ? 'line' : 'bar';
	const bgColor =
		type === 'ratio' || type === 'percentage'
			? 'rgba(44, 98, 136, 0.4)'
			: 'rgba(44, 98, 136, 1)';

	return (
		<Bar
			data={{
				labels: xaxis,
				datasets: [
					{
						type: chartType,
						data: yaxis,
						backgroundColor: bgColor,
						borderColor: 'rgba(44, 98, 136, 1)',
						fill: true,
						pointRadius: 0,
						pointHoverRadius: 5,
						pointHitRadius: 10,
					},
				],
			}}
			plugins={[
				{
					afterDatasetsDraw: function (chart: any) {
						const chartInstance = chart;
						const ctx = chartInstance.ctx;

						ctx.font =
							'13px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
						const fontSize = 12;
						ctx.textAlign = 'start';
						ctx.textBaseline = 'bottom';

						chartInstance.data.datasets.forEach(function (
							dataset: any,
							i: any
						) {
							const meta = chartInstance.getDatasetMeta(i);
							const last = meta.data.length - 1; // The last index of the array, so that the latest stock price is shown

							// const length = chart.scales.y._labelItems.length - 1;

							// numericals are offsets for positional purposes, x and y marks the exact coordinates of the graph end.

							let x =
								meta.vScale._labelItems[
									meta.vScale._labelItems.length - 1
								].translation[0] - 0.5;

							const y = meta.data[last].y - 7.5;

							let str: any;

							if (dataset.data[last] == '0') {
								return;
							}
							// retrieve the stock price, data.
							if (type == 'reduce_precision') {
								str = reducePrecisionFix(dataset.data[last]);
							} else {
								str = formatY(dataset.data[last], type);
							}

							// begin drawing and styling
							ctx.strokeStyle = '#2c6288';
							ctx.fillStyle = '#2c6288';
							ctx.lineWidth = '3.5 ';
							ctx.lineJoin = 'miter';

							// calculate the width of the box and height is based on fontsize.

							let widthOffset = 2.6;

							if (str[0] == '-') {
								widthOffset = 3.6;
							}

							const numberOfDecimals = countDecimals(str);

							if (numberOfDecimals == 2 && str.length > 3) {
								widthOffset = 3.4;
							}

							const width = ctx.measureText(str).width + widthOffset;

							if (chartType == 'line') {
								x = x - 15.5;
							}

							const height = fontSize + 2.8;

							ctx.beginPath();
							ctx.moveTo(x + 0.7, y + height);
							ctx.moveTo(x - 6, y + height / 2);
							ctx.lineTo(x + 0.7, y + height);
							ctx.lineTo(x + 0.7 + width, y + height);
							ctx.lineTo(x + 0.7 + width, y);
							ctx.lineTo(x + 0.7, y);
							ctx.fill();
							ctx.closePath();
							ctx.stroke();

							// draw the text
							ctx.fillStyle = '#ffffff';

							ctx.fillText(str, x, meta.data[last].y + 7);
						});
					},
				},
			]}
			options={{
				maintainAspectRatio: false,
				scales: {
					x: {
						ticks: {
							color: '#323232',
							font: {
								size: 13,
							},
						},
						grid: {
							display: false,
						},
					},
					y: {
						position: 'right',
						ticks: {
							color: '#323232',
							font: {
								size: 13,
							},
							callback: function (value: number) {
								return formatY(value, row.format);
							},
						},
						grid: {
							drawBorder: false,
						},
					},
				},
				animation: {
					duration: 400,
				},
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: `${ticker} ${row.title} (${rangeUppercase})`,
						font: {
							size: 18,
						},
						color: '#333',
						padding: {
							top: 4,
							right: 0,
							bottom: 12,
							left: 0,
						},
					},
					tooltip: {
						backgroundColor: '#f6f7f8',
						borderColor: '#ccc',
						borderWidth: 1,
						titleColor: '#323232',
						bodyColor: '#323232',
						titleFont: {
							size: 17,
							weight: '600',
						},
						bodyFont: {
							size: 14,
							weight: '400',
						},
						bodyFontColor: '#333',
						bodyFontSize: 14,
						bodyFontStyle: 400,
						padding: 10,
						displayColors: false,
						callbacks: {
							label: function (context: { parsed: { y: string } }) {
								const value = context.parsed.y || '';
								if (
									type === 'growth' ||
									type === 'percentage' ||
									type === 'margin'
								) {
									return `${value}%`;
								}
								return value;
							},
						},
					},
				},
			}}
		/>
	);
};

export default HoverChart;
