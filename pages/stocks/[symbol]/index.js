import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import Stock from "@/components/Layout/StockLayout";
import { InfoTable, QuoteTable } from "@/components/Stocks/Overview/TopTables";
import PriceChart from "@/components/Stocks/Overview/PriceChart";
import Profile from "@/components/Stocks/Overview/ProfileWidget";
import NewsFeed from "@/components/Stocks/Overview/StockNews";
import FinancialsWidget from "@/components/Stocks/Overview/FinancialsWidget";
import AnalystWidget from "@/components/Stocks/Overview/AnalystWidget";
import Axios from "axios";
import styles from "@/Styles/TopGrid.module.css";
import { stockState } from "@State/stockState";
import { useEffect } from "react";

export default function StockOverview(props) {
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
			<div className={"px-4 lg:px-6 " + styles.tg}>
				<PriceChart />
				<InfoTable />
				<QuoteTable />
			</div>
			<div className="px-0 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar gap-10">
				<div className="px-4 lg:px-0 lg:order-2 space-y-6">
					<Profile />
					<FinancialsWidget />
					<AnalystWidget />
				</div>
				<div className="lg:order-1">
					<NewsFeed props={props.news} />
				</div>
			</div>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
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
