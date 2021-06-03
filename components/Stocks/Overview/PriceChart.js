import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import Axios from 'axios';
import { stockState } from '@State/stockState';
import styles from '@/Styles/PriceChart.module.css';

export default function PriceChart() {
	const info = stockState((state) => state.info);
	const [chartData, setChartData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchChartData() {
			try {
				setIsLoading(false);
				const response = await Axios.get(`/api/chart?i=${info.id}&m=1`, {
					timeout: 5000,
				});

				setChartData(response.data);
			} catch (e) {
				console.log('There was a problem.');
			} finally {
				setIsLoading(false);
			}
		}

		fetchChartData();

		return () => {
			setChartData([]);
		};
	}, [info]);

	if (isLoading || !chartData.length) {
		return (
			<div className="w-full h-full">
				<div className="flex justify-center items-center h-full bg-gray-50 border border-gray-200">
					<svg
						className="animate-spin h-12 w-12 text-blue-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</div>
			</div>
		);
	}

	const timeAxis = chartData.map((item) => {
		return item.t;
	});

	const priceAxis = chartData.map((item) => {
		return item.c;
	});

	return (
		<div className={styles.stockChart}>
			<div className="h-64 sm:h-80 lg:h-full lg:border-l lg:border-gray-300 lg:pl-4">
				<Line
					data={{
						labels: timeAxis,
						datasets: [
							{
								label: 'Stock Price',
								data: priceAxis,
								backgroundColor: 'rgba(44, 98, 136, 1)',
								borderColor: 'rgba(44, 98, 136, 1)',
								pointRadius: 0,
							},
						],
					}}
					options={{
						maintainAspectRatio: false,
						scales: {
							x: {
								type: 'timeseries',
								grid: {
									display: false,
								},
							},
							y: {
								position: 'right',
							},
						},
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
				/>
			</div>
		</div>
	);
}
