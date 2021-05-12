import Symbol from "@/components/Layout/LayoutSymbol";
import { InfoTable, QuoteTable } from "@/components/Symbols/Overview/TopTables";
import PriceChart from "@/components/Symbols/Overview/PriceChart";

export default function SymbolOverview({ data }) {
	if (!data) {
		return <h1>Loading...</h1>;
	}

	return (
		<Symbol props={data}>
			<div className="grid grid-cols-overview gap-4">
				<InfoTable />
				<QuoteTable />
				<PriceChart id={data.data.id} />
			</div>
		</Symbol>
	);
}

import { getStockPaths, getStockProperties } from "@/Functions/fetchStockInfo";

export async function getStaticPaths() {
	const paths = getStockPaths();

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const data = await getStockProperties({ params });

	return {
		props: {
			data,
		},
	};
}
