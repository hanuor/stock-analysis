import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";

export default function SymbolStatistics(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}
	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<h2 className="text-2xl font-bold my-8">
					This is the statistics page for {props.info.ticker}
				</h2>
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
	const data = await getPageData(info.id, "overview");

	return {
		props: {
			info,
			data,
		},
	};
}
