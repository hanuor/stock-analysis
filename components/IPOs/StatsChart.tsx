import { Bar, defaults } from 'react-chartjs-2';
import { useRef } from 'react';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

interface Props {
	title: string;
	x: string[];
	y: number[];
}

export const StatsChart = ({ title, x, y }: Props) => {
	const chartRef = useRef<any>();

	return (
		<div className="mt-4 mb-3 sm:mb-4 border border-gray-200 h-[300px] sm:h-[390px] p-1 sm:p-2">
			<Bar
				ref={chartRef}
				data={{
					labels: x,
					datasets: [
						{
							data: y,
							backgroundColor: 'rgba(44, 98, 136, 1)',
							borderColor: 'rgba(44, 98, 136, 1)',
							hoverBackgroundColor: 'rgba(44, 98, 136, 1)',
							hoverBorderColor: 'rgba(44, 98, 136, 1)',
						},
					],
				}}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: {
							ticks: {
								color: '#323232',
								font: {
									size: 15,
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
									size: 15,
								},
								padding: 5,
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
						title: {
							display: true,
							text: title,
							font: {
								size: 24,
								weight: 'normal',
							},
							color: '#333',
							padding: {
								top: 10,
								right: 5,
								bottom: 12,
								left: 5,
							},
						},
						tooltip: {
							borderWidth: 1,
							titleFont: {
								size: 18,
								weight: '600',
							},
							bodyFont: {
								size: 15,
								weight: '400',
							},
							bodyFontSize: 14,
							bodyFontStyle: 400,
							padding: {
								top: 6,
								right: 15,
								bottom: 6,
								left: 15,
							},
							displayColors: false,
							callbacks: {
								label: function (tooltipItem: {
									formattedValue: string;
								}) {
									return 'IPOs: ' + tooltipItem.formattedValue;
								},
							},
						},
					},
					animation: {
						duration: 1,
						onProgress: function () {
							if (
								typeof window !== 'undefined' &&
								window.innerWidth > 500
							) {
								const instance = chartRef.current.$context.chart;
								const ctx = instance.ctx;
								const size = x.length > 12 ? '13px' : '14 px';

								ctx.font =
									size +
									' -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
								ctx.fillStyle = '#222222';
								ctx.textAlign = 'center';
								ctx.textBaseline = 'bottom';

								instance.data.datasets.forEach(function (
									dataset: any,
									i: any
								) {
									const meta = instance.getDatasetMeta(i);
									meta.data.forEach(function (
										bar: { x: any; y: number },
										index: number
									) {
										const data = y[index];
										ctx.fillText(data, bar.x, bar.y - 5);
									});
								});
							}
						},
					},
				}}
			/>
		</div>
	);
};
