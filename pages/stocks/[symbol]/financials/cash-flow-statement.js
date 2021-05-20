/* eslint-disable react/display-name */
import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";
import {
	getStockUrls,
	getPageData,
	getStockInfo,
} from "@/Functions/fetchStockInfo";

export default function FinancialsPage(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<FinancialTable
					title="Cash Flow Statement"
					type="cash_flow_statement"
				/>
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
