/* eslint-disable no-mixed-spaces-and-tabs */
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { formatNumber } from "@/Functions/formatNumber";
import { formatY } from "@/Functions/financials.functions";

export default function HoverChart({ data, count, row, range, ticker }) {
	let rangeUppercase = range.charAt(0).toUpperCase() + range.slice(1);
	let dataid = row.data || row.id;
	let rowdata = data[dataid];
	let type = row.format;

	const y = rowdata.map((current, index) => {
		let previous = row.format === "growth" ? data[dataid][index + 1] : null;
		let revenue = row.format === "margin" ? data.revenue[index] : null;

		let cellContent = type
			? formatNumber({
					type,
					current,
					previous,
					revenue,
			  })
			: current;

		return parseFloat(cellContent);
	});

	const xdata = data.datekey.slice(0, count);
	const xaxis = xdata.reverse();

	const ydata = y.slice(0, count);
	const yaxis = ydata.reverse();

	return (
		<Bar
			data={{
				labels: xaxis,
				datasets: [
					{
						data: yaxis,
						backgroundColor: "rgba(44, 98, 136, 1)",
						borderColor: "rgba(44, 98, 136, 1)",
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
						ticks: {
							callback: function (value) {
								return formatY(value, row.format);
							},
						},
					},
				},
				animation: {
					duration: 400,
				},
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: `${ticker} ${row.title} (${rangeUppercase})`,
						font: {
							size: 18,
						},
						color: "#333",
					},
				},
			}}
		/>
	);
}
