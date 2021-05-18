import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";

export default function SymbolStatistics(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const newincome = props.data.newincome; // The newincome statement

	// Map the header row data
	const columns = newincome.datekey.map(function (item, index) {
		return {
			Header: item,
			accessor: `${index}`,
		};
	});

	// Add title column to front of array
	columns.unshift({
		Header: "Year",
		accessor: "title",
	});

	const DATA_MAP = [
		{
			id: "revenue",
			data: "revenue",
			title: "Revenue",
			frmt: function (value) {
				return value / 1000;
			},
		},
		{
			id: "revenueGrowth",
			data: "revenue",
			title: "Revenue Growth",
			frmt: function (current, previous) {
				return current / previous;
			},
		},
		{
			id: "gp",
			data: "gp",
			title: "Gross Profit",
			frmt: function (value) {
				return value / 1000;
			},
		},
	];

	const data = [];

	DATA_MAP.map(function (row) {
		const data_row = {};
		data_row["title"] = row.title;

		let count = newincome[row.data].length;

		for (let i = 0; i < count; i++) {
			let item = newincome[row.data][i];
			let prev = newincome[row.data][i + 1];

			data_row[i] = row.frmt(item, prev);
			// console.log(newincome[row.data][i]);
		}

		data.push(data_row);
	});

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<div className="px-4 lg:px-6 mx-auto">
					<h1 className="text-2xl font-bold">Balance Sheet</h1>
					<div className="overflow-x-auto">
						<FinancialTable columns={columns}>{data}</FinancialTable>
					</div>
				</div>
			</PageContext.Provider>
		</Stock>
	);
}

import {
	getStockUrls,
	getPageData,
	getStockInfo,
} from "@/Functions/fetchStockInfo";

export async function getStaticPaths() {
	const paths = getStockUrls();

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, "financials");

	return {
		props: {
			info,
			data,
		},
	};
}
