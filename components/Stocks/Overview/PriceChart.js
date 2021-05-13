// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Remove before deploying to production
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import Axios from "axios";
import { useContext } from "react";
import StockContext from "@/components/Context/StockContext";

export default function PriceChart() {
	const stock = useContext(StockContext);
	const [chartData, setChartData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchChartData() {
			try {
				const response = await Axios.get(`/api/chart?i=${stock.id}&m=1`);
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

	const timeAxis = chartData.map((item) => {
		return item.t;
	});

	const priceAxis = chartData.map((item) => {
		return item.c;
	});

	return (
		<div className="border-l border-gray-300 pl-3 lg:order-3 min-w-0">
			<Line
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
					maintainAspectRatio: false,
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
}
