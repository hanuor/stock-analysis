import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";

export default function SymbolStatistics(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const cashFlow = props.data.cashFlow; // The cashFlow statement

	// Map the header row data
	const columns = cashFlow[0].data.map(function (item, index) {
		return {
			Header: item,
			accessor: `col${index}`,
		};
	});

	// Add title column to front of array
	columns.unshift({
		Header: cashFlow[0].title,
		accessor: "titlecolumn",
	});

	// Map the data rows
	const data = [];
	let count = cashFlow.length;
	for (let i = 1; i < count; i++) {
		let data_row = {};

		data_row["titlecolumn"] = cashFlow[i].title;

		cashFlow[i].data.map(function (item, index) {
			let col = `col${index}`;
			data_row[col] = item;
		});

		data.push(data_row);
	}

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<div className="px-4 lg:px-6 mx-auto">
					<h1 className="text-2xl font-bold">Cash Flow Statement</h1>
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
