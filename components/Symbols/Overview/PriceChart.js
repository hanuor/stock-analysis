import { Line } from "react-chartjs-2";
import { stockData } from "./stockdata.js";
import "chartjs-adapter-luxon";

const timeAxis = stockData.map((item) => {
	return item.t;
});

const priceAxis = stockData.map((item) => {
	return item.c;
});

// console.log(defaults);

const data = {
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
};

const options = {
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
};

export default function PriceChart() {
	return (
		<div className="border-l border-gray-300 pl-2">
			<Line data={data} options={options} />
		</div>
	);
}
