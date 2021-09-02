import { Bar, defaults } from 'react-chartjs-2';
import { Unavailable } from 'components/Unavailable';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
defaults.color = '#222222';

interface AnalystWidgetChartI {
	ratings: {
		strongsell: number;
		sell: number;
		hold: number;
		buy: number;
		strongbuy: number;
	};
}

export function AnalystWidgetChart({ ratings }: AnalystWidgetChartI) {
	if (
		typeof window !== 'undefined' &&
		typeof window.ResizeObserver === 'undefined'
	) {
		return (
			<Unavailable
				message="This chart does not work in your browser. Please update to the latest browser version."
				small={true}
				classes="mt-3"
			/>
		);
	}

	return (
		<Bar
			data={{
				labels: ['Sell', 'Underweight', 'Hold', 'Buy', 'Strong Buy'],
				datasets: [
					{
						label: 'Analysts',
						data: [
							ratings.strongsell,
							ratings.sell,
							ratings.hold,
							ratings.buy,
							ratings.strongbuy,
						],
						backgroundColor: [
							'#FF3333',
							'#FF3333',
							'#323232',
							'#0B610B',
							'#0B610B',
						],
					},
				],
			}}
			options={{
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: {
						ticks: {
							font: {
								size: 14,
							},
						},
						grid: {
							display: false,
						},
					},
					y: {
						position: 'right',
						ticks: {
							font: {
								size: 14,
							},
							padding: 0,
						},
						grid: {
							drawBorder: false,
						},
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						borderWidth: 1,
						titleFont: {
							size: 17,
							weight: '600',
						},
						bodyFont: {
							size: 15,
							weight: '400',
						},
						padding: {
							top: 12,
							right: 15,
							bottom: 12,
							left: 15,
						},
						displayColors: false,
					},
				},
			}}
		/>
	);
}
