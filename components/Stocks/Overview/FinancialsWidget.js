import PageContext from "@/components/Context/PageContext";
import StockContext from "@/components/Context/StockContext";
import Link from "next/link";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";

export default function FinancialsWidget() {
	const info = useContext(StockContext);
	const data = useContext(PageContext);

	const earnings = data.financialChart[2];
	const colors = [];

	earnings.map(function (item) {
		if (item < 0) {
			colors.push("#CD5C5C");
		} else {
			colors.push("#00853E");
		}
	});

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">Financial Performance</h2>
			{data.financialIntro && <p>{data.financialIntro}</p>}
			<div className="h-60 border border-gray-200 p-2">
				<Bar
					data={{
						labels: data.financialChart[0],
						datasets: [
							{
								label: "Revenue",
								backgroundColor: "#2C6288",
								data: data.financialChart[1],
								categoryPercentage: 0.8,
								barPercentage: 0.85,
							},
							{
								label: "Net Income",
								backgroundColor: colors,
								data: data.financialChart[2],
								categoryPercentage: 0.8,
								barPercentage: 0.85,
							},
						],
					}}
					options={{
						maintainAspectRatio: false,
						scales: {
							x: {
								grid: {
									display: false,
								},
							},
							y: {
								position: "right",
								ticks: {
									beginAtZero: true,
									callback: function (value, index, values) {
										let newvalue = value / 1000000;
										return newvalue
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									},
								},
							},
						},
						plugins: {
							legend: {},
						},
					}}
				/>
			</div>
			<button className="w-full bg-blue-500 my-3 py-2 px-3 text-xl text-white font-semibold">
				<Link href={`/stocks/${info.symbol}/financials/`}>
					<a>Financial Statements</a>
				</Link>
			</button>
		</div>
	);
}
