import { Bar, defaults } from 'react-chartjs-2';
import { useRef } from 'react';
import Link from 'next/link';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

interface Props {
	heading?: string;
	intro?: string;
	title: string;
	link?: string;
	data: {
		[key: string]: number;
	};
}

export const ActionsChart = ({ heading, intro, title, link, data }: Props) => {
	const chartRef = useRef<any>();

	const x = Object.keys(data).map((key) => {
		return key;
	});

	const y = Object.values(data).map((value) => {
		return value;
	});

	const text = link ? (
		<div className="text-lg mb-4">
			{intro}{' '}
			<Link href={link} prefetch={false}>
				<a className="bll">See full list.</a>
			</Link>
		</div>
	) : (
		<p className="text-lg mb-4">{intro}</p>
	);

	return (
		<>
			{heading && <h2 className="hh2">{heading}</h2>}
			{text}
			<div className="h-80 border border-gray-200 p-1 mb-6">
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
									color: '#323232',
									font: {
										size: 14,
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
									size: 22,
									weight: 600,
								},
								color: '#323232',
								padding: {
									top: 10,
									right: 5,
									bottom: 22,
									left: 5,
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
									size: 15,
									weight: '400',
								},
								bodyFontColor: '#323232',
								bodyFontSize: 14,
								bodyFontStyle: 400,
								padding: 10,
								displayColors: false,
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
									const size = x.length > 12 ? '12px' : '14px';

									ctx.font =
										size +
										' -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
									ctx.fillStyle = '#444';
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
		</>
	);
};
