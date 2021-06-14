import { getPageData, getStockInfo } from '@/Functions/fetchStockInfo';
import Stock from '@/components/Layout/StockLayout';
import { InfoTable, QuoteTable } from '@/components/Stocks/Overview/TopTables';
import PriceChart from '@/components/Stocks/Overview/PriceChart/_PriceChart';
import Profile from '@/components/Stocks/Overview/ProfileWidget';
import NewsFeed from '@/components/Stocks/Overview/StockNews';
import FinancialsWidget from '@/components/Stocks/Overview/FinancialsWidget';
import AnalystWidget from '@/components/Stocks/Overview/AnalystWidget';
import Axios from 'axios';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';

export default function StockOverview({ info, data, news }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<div className="px-3 xs:px-4 lg:px-6 lg:flex flex-row gap-4">
				<div className="order-3 flex-grow overflow-auto">
					<PriceChart />
				</div>
				<div className="order-1 flex flex-row justify-between gap-4">
					<InfoTable />
					<QuoteTable />
				</div>
			</div>
			<div className="px-0 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar gap-10">
				<div className="px-4 lg:px-0 lg:order-2 space-y-6">
					<Profile />
					<FinancialsWidget />
					<AnalystWidget />
				</div>
				<div className="lg:order-1">
					<NewsFeed props={news} />
				</div>
			</div>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, 'overview');
	const newsdata = await Axios.get(
		`https://stockanalysis.com/wp-json/sa/news?i=${info.id}`
	);
	const news = await newsdata.data;

	return {
		props: {
			info,
			data,
			news,
		},
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
