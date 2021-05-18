import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";
import { formatNumber } from "@/Functions/formatNumber";
import { financialsState } from "@State/financialsState";
import {
	getStockUrls,
	getPageData,
	getStockInfo,
} from "@/Functions/fetchStockInfo";
import mapData from "@Data/balance_sheet"; // varies by page

const data_name = "balance_sheet"; // varies by page
const title = "Balance Sheet"; // varies by page

export default function FinancialsPage(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const range = financialsState((state) => state.range);
	const rawdata = props.data[data_name][range]; // The financial data
	const data_map = mapData(); // Defines how to map and format the data rows
	const count = rawdata.datekey.length; // How many data columns
	const divider = "thousands"; // Can change to millions and raw dynamically

	// Columns (header row)
	const columns = [];
	for (let i = 0; i < count; i++) {
		let item = rawdata.datekey[i];

		columns[i] = {
			Header: item,
			accessor: `${i}`,
		};
	}
	let dateRowTitle = range == "annual" ? "Year" : "Quarter Ended";
	columns.unshift({ Header: dateRowTitle, accessor: "title" });

	// Data rows
	const data = [];
	data_map.map(function (row) {
		const data_row = {};
		data_row["title"] = row.title;

		for (let i = 0; i < count; i++) {
			let item = rawdata[row.data][i];
			let prev = rawdata[row.data][i + 1];

			data_row[i] = formatNumber({
				type: row.format,
				current: item,
				previous: prev,
				divider,
			});
		}

		data.push(data_row);
	});

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<div className="px-4 lg:px-6 mx-auto">
					<h1 className="text-2xl font-bold">
						{title} ({range.charAt(0).toUpperCase() + range.slice(1)})
					</h1>
					<div className="overflow-x-auto">
						<FinancialTable columns={columns}>{data}</FinancialTable>
					</div>
				</div>
			</PageContext.Provider>
		</Stock>
	);
}

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
