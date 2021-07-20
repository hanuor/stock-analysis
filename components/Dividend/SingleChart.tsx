import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { formatDateClean } from 'functions/formatDates';

const countZero = (cutter: number[]) => {
	let count = 0;
	for (let i = 0; i < cutter.length; i++) {
		const zeroCheck = cutter[i];
		if (zeroCheck !== 0) {
			break;
		}
		count++;
	}
	return count;
};

interface Props {
	xdata: string[];
	ydata: number[];
	type: string;
	title: string;
}

export const SingleChart = ({ xdata, ydata, type, title }: Props) => {
	const x = useMemo(() => xdata.slice(countZero(ydata)), [xdata, ydata]);
	const y = useMemo(() => ydata.slice(countZero(ydata)), [ydata]);

	return (
		<div className="h-72 border border-gray-200 p-0.5 xs:p-1">
			<Bar
				type="bar"
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
									size: 14,
								},
								padding: 5,
								callback: function (value: number) {
									if (type === 'amount') {
										const newvalue = value.toFixed(2);
										return '$' + newvalue;
									}
									return value + '%';
								},
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
								size: 18,
								weight: 500,
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
							bodyFontColor: '#333',
							bodyFontSize: 14,
							bodyFontStyle: 400,
							padding: {
								top: 10,
								right: 15,
								bottom: 10,
								left: 15,
							},
							displayColors: false,
							callbacks: {
								title: function (tooltipItem: { label: string }[]) {
									return formatDateClean(tooltipItem[0].label);
								},
								label: function (context: { parsed: { y: number } }) {
									if (type === 'amount') {
										const newvalue = context.parsed.y.toFixed(3);
										return '$' + newvalue;
									}
									const newvalue = context.parsed.y.toFixed(2);
									return newvalue + '%';
								},
							},
						},
					},
				}}
			/>
		</div>
	);
};
