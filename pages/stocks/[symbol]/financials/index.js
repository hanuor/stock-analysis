import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";
import { INCOME_ANNUAL } from "@Data/income_statement";
import { formatNumber } from "@/Functions/formatNumber";
import { financialsState } from "@State/financialsState";

export default function IncomeStatement(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const range = financialsState((state) => state.range);
	console.log(range);
	const income = props.data.income[range]; // The financial data
	const data_map = INCOME_ANNUAL(); // Defines how to map and format the data rows
	const count = income.datekey.length; // How many data columns
	const divider = "thousands"; // Can change to millions and raw dynamically

	// Columns (header row)
	const columns = [];
	for (let i = 0; i < count; i++) {
		let item = income.datekey[i];

		columns[i] = {
			Header: item,
			accessor: `${i}`,
		};
	}
	columns.unshift({ Header: "Year", accessor: "title" });

	// Data rows
	const data = [];
	data_map.map(function (row) {
		const data_row = {};
		data_row["title"] = row.title;

		for (let i = 0; i < count; i++) {
			let item = income[row.data][i];
			let prev = income[row.data][i + 1];

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
						Income Statement ({range})
					</h1>
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
