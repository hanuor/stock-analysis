import Stock from "@/components/Layout/LayoutStock";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";

export default function SymbolStatistics(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	// Map the header row data
	const columns = props.data[0].data.map(function (item, index) {
		return {
			Header: item,
			accessor: `col${index}`,
		};
	});

	// Add title column to front of array
	columns.unshift({
		Header: props.data[0].title,
		accessor: "titlecolumn",
	});

	// Map the data rows
	const data = [];
	let count = props.data.length;
	for (let i = 1; i < count; i++) {
		let data_row = {};

		data_row["titlecolumn"] = props.data[i].title;

		props.data[i].data.map(function (item, index) {
			let col = `col${index}`;
			data_row[col] = item;
		});

		data.push(data_row);
	}

	console.log(data);

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<div className="px-4 lg:px-6 mx-auto">
					<h1 className="text-2xl font-bold">Income Statement</h1>
					This is the financials page for {props.info.ticker}
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
