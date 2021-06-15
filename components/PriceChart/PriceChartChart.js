import { Line, defaults } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

const Chart = ({ chartData, chartTime }) => {
	let unit = 'month';

	if (chartTime === '1D') {
		unit = 'minute';
	} else if (chartTime === '5D') {
		unit = 'day';
	} else if (chartTime === '1M' || chartTime === '6M') {
		unit = 'day';
	} else if (chartTime === '5Y' || chartTime === 'MAX') {
		unit = 'year';
	}

	const timeAxis = chartData.map((item) => {
		if (chartTime === '1D' || chartTime === '5D') {
			return DateTime.fromFormat(item.t, 'yyyy-MM-dd hh:mm');
		}
		return item.t;
	});

	const priceAxis = chartData.map((item) => {
		return item.c;
	});

	let ticks = 12;
	if (typeof window !== 'undefined') {
		if (window.screen.width < 450) {
			ticks = 9;
		}
		if (window.screen.width < 370) {
			ticks = 6;
		}
	}

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
						type: 'timeseries',
						time: {
							unit: unit,
						},
						grid: {
							display: false,
						},
						ticks: {
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
				},
			}}
		/>
	);
};

export default Chart;
