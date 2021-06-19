import {
	getEtfInfo,
	getPageData,
	getNewsData,
} from '@/Functions/callBackEnd';
import { useEffect } from 'react';
import stockState from '@State/stockState';
import Stock from '@/components/Layout/StockLayout';
import { InfoTable, QuoteTable } from '@/components/Overview/TopTablesETF';
import PriceChart from '@/components/PriceChart/_PriceChart';
import Profile from '@/components/Overview/ProfileWidget';
import NewsArea from '@/components/Overview/NewsArea';

const EtfOverview = ({ info, data, news }) => {
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
			<div className="px-0 md:px-4 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar_wide gap-10">
				<div className="px-4 md:px-0 lg:order-2 space-y-6">
					<Profile />
				</div>
				<div className="lg:order-1">
					<NewsArea news={news} />
				</div>
			</div>
		</Stock>
	);
};

export default EtfOverview;

export async function getStaticProps({ params }) {
	const info = await getEtfInfo({ params });
	const data = await getPageData(info.id, 'overview');
	const news = await getNewsData(info.id);

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
