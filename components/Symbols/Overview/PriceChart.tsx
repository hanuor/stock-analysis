import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon"; // Needed to use timeseries with chart.js
import Axios from "axios";

interface IProps {
	id: number;
}

interface ChartDataPoint {
	t: string;
	c: number;
	o?: number;
}

const PriceChart: React.FC<IProps> = ({ id }) => {
	const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Fetch chart data before rendering the component
	useEffect(() => {
		async function fetchChartData() {
			try {
				const response = await Axios.get(`/api/chart/${id}/?m=1`); // m stands for minimal, fetching closing prices only
				setChartData(response.data);
				setIsLoading(false);
			} catch (e) {
				console.log("There was a problem.");
			}
		}

		fetchChartData();
	}, []);

	if (isLoading) {
		return <div className="border border-gray-300 bg-gray-50"></div>;
	}

	// Turn the chart data into arrays before feeding into chart.js
	const timeAxis = chartData.map((item: ChartDataPoint) => {
		return item.t;
	});

	const priceAxis = chartData.map((item: ChartDataPoint) => {
		return item.c;
	});

	return (
		<div className="border-l border-gray-300 pl-2">
			<Line // The chart.js chart
				type="line"
				data={{
					labels: timeAxis,
					datasets: [
						{
							label: "Stock Price",
							data: priceAxis,
							backgroundColor: "rgba(44, 98, 136, 1)",
							borderColor: "rgba(44, 98, 136, 1)",
							pointRadius: 0,
						},
					],
				}}
				options={{
					scales: {
						x: {
							type: "timeseries",
							grid: {
								display: false,
							},
						},
						y: {
							position: "right",
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
	);
};
export default PriceChart;
