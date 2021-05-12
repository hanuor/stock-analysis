import Stock from "@/components/Layout/LayoutStock";
import { InfoTable, QuoteTable } from "@/components/Stocks/Overview/TopTables";
import PriceChart from "@/components/Stocks/Overview/PriceChart";
import PageContext from "@/components/Context/PageContext";

export default function StockOverview(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<div className="grid grid-cols-overview gap-3">
					<InfoTable />
					<QuoteTable />
					<PriceChart />
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
	const data = await getPageData({ params }, "overview");

	return {
		props: {
			info,
			data,
		},
	};
}
