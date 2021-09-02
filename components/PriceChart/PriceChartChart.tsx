import {
	LineController,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	TimeSeriesScale,
	TimeScale,
} from 'chart.js';
import { formatDateTimestamp, formatDateClean } from 'functions/formatDates';
import { Unavailable } from 'components/Unavailable';

import { ReactChart } from './ReactChartWrapper/ReactChart';

import 'chartjs-adapter-date-fns';

interface Props {
	chartData: ChartDataType[];
	chartTime: string;
}

type ChartDataType = {
	t: string;
	c: number;
	o?: number;
};

ReactChart.register(
	LineController,
	PointElement,
	LineElement,
	TimeSeriesScale,
	Tooltip,
	Title,
	TimeScale
);

export const Chart = ({ chartData, chartTime }: Props) => {
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

	const axisType = chartTime == '5D' ? 'timeseries' : 'time';
	const axisTimeUnit = chartTime == '5D' ? 'day' : false;
	const axisSource = chartTime == '5D' ? 'data' : 'auto';

	const timeAxis = chartData.map((item) => {
		const dateObj = new Date(item.t);
		const epoch = dateObj.getTime();
		return epoch;
	});

	const priceAxis = chartData.map((item) => {
		return item.c;
	});
	console.log(chartData);

	return (
		<ReactChart
			type="line"
			data={{
				labels: timeAxis,
				datasets: [
					{
						label: 'Stock Price',
						data: priceAxis,
						borderColor: '#2c6288',
						pointHitRadius: 5,
						pointRadius: 0,
						tension: 0.01,
						borderWidth: 3,
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
							'13px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
						const fontSize = 12;
						ctx.textAlign = 'start';
						ctx.textBaseline = 'bottom';

						chartInstance.data.datasets.forEach(function (
							dataset: { data: any[] },
							i: any
						) {
							const meta = chartInstance.getDatasetMeta(i);

							const last = meta.data.length - 1; // The last index of the array, so that the latest stock price is shown

							// numericals are offsets for positional purposes, x and y marks the exact coordinates of the graph end.
							const x = meta.data[last].x + 32;
							const y = meta.data[last].y - 10;

							// retrieve the stock price, data.
							const raw = parseFloat(dataset.data[last]);
							// const str = dataset.data[last];
							const str = raw.toFixed(2);

							// begin drawing and styling

							ctx.save();

							ctx.strokeStyle = '#2c6288';
							ctx.fillStyle = '#2c6288';
							ctx.lineWidth = '3.5';
							ctx.lineJoin = 'round';

							// calculate the width of the box and height is based on fontsize.
							const width = ctx.measureText(str).width + 1.2;
							const xPos = x - 23.5;
							const height = fontSize + 2.8;
							const yPos = y + 1;

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
							ctx.fillText(str, x - 22, meta.data[last].y + 7.5);
							ctx.restore();
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
						type: axisType, // Setja fast time unit
						time: {
							unit: axisTimeUnit,

							displayFormats: {
								quarter: 'MMM YYYY',
								minute: 'HH:MM',
								hour: 'HH:MM a',
							},
						},
						ticks: {
							color: '#323232',
							source: axisSource,

							font: {
								size: 13,
							},
							autoSkip: true,

							maxRotation: 0,
							minRotation: 0,
							maxTicksLimit: chartTime === '1Y' ? 7 : 5,
						},
					},
					y: {
						position: 'right',
						ticks: {
							color: '#555555',
							font: {
								size: 12.5,
							},
						},
					},
				},
				layout: {
					padding: {
						right: 17,
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
							title: function (tooltipItem) {
								if (chartTime === '1Y') {
									return formatDateClean(
										new Date(tooltipItem[0].parsed.x).toString()
									);
								} else if (chartTime === '1D' || chartTime === '5D') {
									return formatDateTimestamp(
										new Date(tooltipItem[0].parsed.x).toString()
									);
								} else if (chartTime === '5Y' || chartTime === 'MAX') {
									return (
										'Week of ' +
										formatDateClean(
											new Date(tooltipItem[0].parsed.x).toString()
										)
									);
								}
								return formatDateClean(
									new Date(tooltipItem[0].parsed.x).toString()
								);
							},
							label: function (context) {
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
