import {
	LineController,
	LineElement,
	PointElement,
	Tooltip,
	LinearScale,
	CategoryScale,
	Filler,
} from 'chart.js';

import {
	formatDateTimestamp,
	formatDateClean,
	formatDateMinute,
	formatDateDay,
	formatDateMonth,
	formatDateYear,
} from 'functions/formatDates';
import { Unavailable } from 'components/Unavailable';
import { ReactChart } from 'components/ReactChart';
import { Info } from 'types/Info';
import { useQuote } from 'hooks/useQuote';

type ChartDataType = {
	t: string;
	c: number;
	o?: number;
};

interface Props {
	chartData: ChartDataType[];
	chartTime: string;
	info: Info;
}

ReactChart.register(
	LineController,
	PointElement,
	LineElement,
	Tooltip,
	LinearScale,
	CategoryScale,
	Filler
);

ReactChart.defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

export const Chart = ({ chartData, chartTime, info }: Props) => {
	const quote = useQuote(info);
	console.log(quote);
	// Chart.js causes critical errors on older Safari versions
	if (
		typeof window !== 'undefined' &&
		typeof window.ResizeObserver === 'undefined'
	) {
		return (
			<Unavailable
				message="This chart does not work in your browser. Please update to the latest browser version."
				small={true}
			/>
		);
	}

	const label =
		chartTime === '1D' || chartTime === '5D' ? 'Price' : 'Closing Price';

	const timeAxis = chartData.map((item) => {
		return item.t;
	});

	const priceAxis = chartData.map((item) => {
		return item.c;
	});

	let change: Number;
	const count = priceAxis.length;
	if (chartTime === '1D') {
		change = quote.change;
	} else {
		const first = chartData[0].o || priceAxis[0];
		const last = priceAxis[count - 1];
		change = last - first;
	}

	let lineColor = 'rgba(4, 120, 87, 1)';
	if (change < 0) {
		lineColor = 'rgba(220, 38, 38, 1)';
	}

	const prevCloseLine = chartData.map(() => {
		return Number(quote.close.replace(',', ''));
	});

	return (
		<ReactChart
			id={info.id.toString()}
			type="line"
			data={{
				labels: timeAxis,
				datasets: [
					{
						label: 'Stock Price',
						data: priceAxis,
						borderColor: lineColor,
						pointHitRadius: 5,
						pointRadius: 0,
						tension: 0.01,
						borderWidth: 2.5,
						spanGaps: true,
						fill: true,
						backgroundColor: (dataset: any) => {
							const ctx = dataset.chart.ctx;
							const gradient = ctx.createLinearGradient(0, 0, 0, 300);
							if (change < 0) {
								gradient.addColorStop(0, 'rgba(220, 38, 38, 0.8)');
								gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
							} else {
								gradient.addColorStop(0, 'rgba(4, 120, 87, 1)');
								gradient.addColorStop(1, 'rgba(255,255,255,0)');
							}

							return gradient;
						},
					},
					{
						label: 'Previous Close',
						data: prevCloseLine,
						borderColor: 'rgb(51, 51, 51)',
						pointHitRadius: 0,
						pointRadius: 0,
						borderDash: [2, 10],
						tension: 0.01,
						borderWidth: 1,
						spanGaps: true,
					},
				],
			}}
			plugins={[
				{
					id: '1',
					afterDatasetsDraw: function (chart: any) {
						const chartInstance = chart;
						const ctx = chartInstance.ctx;
						ctx.font =
							'12px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
						const fontSize = 12;
						ctx.textAlign = 'start';
						ctx.textBaseline = 'bottom';

						chartInstance.data.datasets.forEach(function (
							dataset: { data: any[]; label: string },
							i: any
						) {
							if (dataset.label == 'Stock Price') {
								const meta = chartInstance.getDatasetMeta(i);

								const last = meta.data.length - 1; // The last index of the array, so that the latest stock price is shown

								// numericals are offsets for positional purposes, x and y marks the exact coordinates of the graph end.
								const x = meta.data[last].x + 32.5;
								const y = meta.data[last].y - 10;

								// retrieve the stock price, data.
								const raw = parseFloat(dataset.data[last]);
								// const str = dataset.data[last];
								const str = raw.toFixed(2);

								// begin drawing and styling

								ctx.save();

								ctx.strokeStyle = lineColor;
								ctx.fillStyle = lineColor;
								ctx.lineWidth = '3.5';
								ctx.lineJoin = 'round';

								// calculate the width of the box and height is based on fontsize.
								const width = ctx.measureText(str).width + 0.4;
								const xPos = x - 23;
								const height = fontSize + 2.8;
								const yPos = y + 1.5;

								// draw triangle to form a pointer.
								ctx.beginPath();
								ctx.moveTo(xPos - 7.7, yPos + 1.5 + height / 2);
								ctx.lineTo(xPos + 0.7, yPos + 2.5 + height);
								ctx.lineTo(xPos + 0.7, yPos + 0.5);
								ctx.fill();
								ctx.closePath();

								// draw the box
								ctx.strokeRect(xPos + 2, yPos + 1.5, width, height);
								ctx.fillRect(xPos + 2, yPos + 1.5, width, height);

								// draw the text
								ctx.fillStyle = '#ffffff';
								ctx.fillText(str, x - 22, meta.data[last].y + 7.4);
								ctx.restore();
							} else {
								const meta = chartInstance.getDatasetMeta(i);
								const last = meta.data.length - 1;
								const x = meta.data[last].x + 32.5;
								ctx.fillStyle = 'rgb(51, 51, 51)';
								let y;

								if (
									Number(quote.close) >
									chartData[chartData.length - 1].c
								) {
									y = meta.data[last].y - 7;
								} else {
									y = meta.data[last].y + 20;
								}

								ctx.fillText(
									'Previous Close: ' + quote.close,
									x - 160,
									y
								);
								ctx.restore();
							}
						});
					},
				},
			]}
			options={{
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: {
						grid: {
							display: false,
						},
						ticks: {
							callback: function (index: number | string) {
								if (typeof index == 'string') {
									index = parseInt(index);
								}

								if (
									chartTime === '1Y' ||
									chartTime === '6M' ||
									chartTime === 'YTD'
								) {
									return formatDateMonth(timeAxis[index]);
								} else if (chartTime === '1D') {
									const lbl = formatDateMinute(timeAxis[index]);
									// Remove leftmost ticks to prevent chart being pushed to the left
									// But only after 3+ hours of trading
									if (count > 180 && lbl.split(':')[0] === '09') {
										return null;
									}
									return formatDateMinute(timeAxis[index]);
								} else if (chartTime === '5D') {
									return formatDateDay(timeAxis[index]);
								} else if (chartTime === '1M') {
									return formatDateDay(timeAxis[index]);
								} else if (chartTime === '5Y' || chartTime === 'MAX') {
									return formatDateYear(timeAxis[index]);
								} else {
									return formatDateClean(timeAxis[index]);
								}
							},
							color: '#323232',
							font: {
								size: 13,
							},
							autoSkip: true,
							autoSkipPadding: 20,
							maxRotation: 0,
							minRotation: 0,
							maxTicksLimit: ['5D', '5Y', 'MAX'].includes(chartTime)
								? 5
								: undefined,
						},
					},
					y: {
						grace: '2%',
						position: 'right',
						ticks: {
							color: '#555555',
							font: {
								size: 12.5,
							},
							padding: 5,
						},
						grid: {
							drawBorder: false,
							color: '#efefef',
						},
					},
				},
				layout: {
					padding: {
						left: 5,
						right: 11,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: true,
						titleFont: {
							size: 16,
							weight: '600',
						},
						bodyFont: {
							size: 14,
							weight: '400',
						},
						padding: {
							top: 12,
							right: 15,
							bottom: 12,
							left: 15,
						},
						displayColors: false,
						callbacks: {
							title: function (tooltipItem: { label: string }[]) {
								if (chartTime === '1Y') {
									return formatDateClean(tooltipItem[0].label);
								} else if (chartTime === '1D' || chartTime === '5D') {
									return formatDateTimestamp(tooltipItem[0].label);
								} else if (chartTime === '5Y' || chartTime === 'MAX') {
									return (
										'Week of ' + formatDateClean(tooltipItem[0].label)
									);
								}
								return formatDateClean(tooltipItem[0].label);
							},
							label: function (context: {
								label: string;
								dataset: { label?: string | undefined };
								parsed: { y: number };
							}) {
								let currlabel = context.dataset.label || '';
								const value = context.parsed.y || '';
								if (currlabel && value) {
									if (
										context.label === timeAxis[timeAxis.length - 1]
									) {
										currlabel = 'Latest Price: ' + value;
									} else {
										currlabel = label + ': ' + value;
									}
								}
								return currlabel;
							},
						},
					},
				},
			}}
		/>
	);
};
