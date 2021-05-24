import Stock from "@/components/Layout/StockLayout";
import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import { stockState } from "@State/stockState";
import { useEffect } from "react";

export default function SymbolStatistics(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);
	useEffect(() => {
		setInfo(props.info);
		setData(props.data);
	}, []);

	return (
		<Stock>
			<h2 className="text-2xl font-bold my-8">
				This is the company page for {props.info.ticker}
			</h2>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
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
