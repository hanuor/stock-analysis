import { Bar, defaults } from 'react-chartjs-2';
import { Unavailable } from 'components/Unavailable';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
defaults.color = '#222222';

interface FinancialsWidgetChartI {
	data: {
		financialChart: [][];
	};
	colors: string[];
	padLegend: {
		id: string;
		beforeInit: (chart: {
			legend: {
				fit: () => void;
				height: number;
			};
		}) => void;
	};
	colorEarnings: {
		id: string;
		beforeDraw: (chart: {
			legend: {
				legendItems: any;
			};
		}) => void;
	};
}

export function FinancialsWidgetChart({
	data,
	colors,
	padLegend,
	colorEarnings,
}: FinancialsWidgetChartI) {
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

	return (
		<Bar
			data={{
				labels: data.financialChart[0],
				datasets: [
					{
						label: 'Revenue',
						backgroundColor: '#2C6288',
						data: data.financialChart[1],
						categoryPercentage: 0.8,
						barPercentage: 0.85,
					},
					{
						label: 'Earnings',
						backgroundColor: colors,
						data: data.financialChart[2],
						categoryPercentage: 0.8,
						barPercentage: 0.85,
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
							beginAtZero: true,
							callback: function (value: number) {
								const newvalue = value / 1000000;
								return newvalue
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
							},
						},
						grid: {
							drawBorder: false,
						},
					},
				},
				plugins: {
					legend: {
						labels: {
							font: {
								size: 15,
							},
							padding: 12,
							position: 'bottom',
							align: 'start',
						},
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
			plugins={[padLegend, colorEarnings]}
			key={Math.random()}
		/>
	);
}
