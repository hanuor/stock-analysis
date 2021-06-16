import { Line, defaults } from 'react-chartjs-2';
import {
	formatDateTimestamp,
	formatDateClean,
	formatDateMinute,
	formatDateDay,
	formatDateMonth,
	formatDateYear,
} from '@/Functions/formatDates';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

const Chart = ({ chartData, chartTime }) => {
	let label = 'Closing Price';
	let ticks = 12;

	switch (chartTime) {
		case '1Y': {
			ticks = 12;
			if (window.screen.width < 450) {
				ticks = 6;
			}
			break;
		}

		case '1D': {
			ticks = 13;
			if (window.screen.width < 450) {
				ticks = 7;
			}
			label = 'Price';
			break;
		}

		case '5D': {
			ticks = 5;
			label = 'Price';
			break;
		}

		case '1M': {
			ticks = 8;
			break;
		}

		case '6M': {
			ticks = 8;
			break;
		}

		case 'YTD': {
			ticks = 8;
			break;
		}

		case '5Y': {
			ticks = 5;
			break;
		}

		case 'MAX': {
			let firstYear = formatDateYear(chartData[0].t);
			let lastYear = formatDateYear(chartData[chartData.length - 1].t);
			let diff = lastYear - firstYear;
			ticks = diff;
			if (window.screen.width < 450 && diff > 7) {
				ticks = 5;
			}
			break;
		}
	}
	const timeAxis = chartData.map((item) => {
		return item.t;
	});

	const priceAxis = chartData.map((item) => {
		return item.c;
	});

	return (
		<Line
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
					},
				],
			}}
			options={{
				maintainAspectRatio: false,
				spanGaps: true,
				scales: {
					x: {
						grid: {
							display: false,
						},
						ticks: {
							callback: function (value, index) {
								if (
									chartTime === '1Y' ||
									chartTime === '6M' ||
									chartTime === 'YTD'
								) {
									return formatDateMonth(timeAxis[index]);
								} else if (chartTime === '1D') {
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
							padding: 0,
							maxTicksLimit: ticks,
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
							label: function (context) {
								let currlabel = context.dataset.label || '';
								let value = context.parsed.y || '';
								if (currlabel && value) {
									currlabel = label + ': ' + value;
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

export default Chart;
