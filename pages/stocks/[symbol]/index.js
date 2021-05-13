import {
	getStockUrls,
	getPageData,
	getStockInfo,
} from "@/Functions/fetchStockInfo";
import Stock from "@/components/Layout/LayoutStock";
import { InfoTable, QuoteTable } from "@/components/Stocks/Overview/TopTables";
import PriceChart from "@/components/Stocks/Overview/PriceChart";
import PageContext from "@/components/Context/PageContext";
import Profile from "@/components/Stocks/Overview/ProfileWidget";
import NewsFeed from "@/components/Stocks/Overview/StockNews";
import FinancialsWidget from "@/components/Stocks/Overview/FinancialsWidget";
import AnalystWidget from "@/components/Stocks/Overview/AnalystWidget";
import Axios from "axios";

export default function StockOverview(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}
	// console.log(props.data);

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<div className="grid lg:grid-cols-overview gap-3">
					<PriceChart />
					<InfoTable />
					<QuoteTable />
				</div>
				<div className="mt-6 grid lg:grid-cols-sidebar gap-10">
					<div className="lg:order-2 space-y-6">
						<Profile />
						<FinancialsWidget />
						<AnalystWidget />
					</div>
					<div className="lg:order-1">
						<NewsFeed props={props.news} />
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
	const data = await getPageData(info.id, "overview");
	const newsdata = await Axios.get(`${process.env.API_URL}/news?i=${info.id}`);
	const news = await newsdata.data;

	return {
		props: {
			info,
			data,
			news,
		},
	};
}
