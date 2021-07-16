import { getPageData } from 'functions/callBackEnd';
import { useEffect } from 'react';
import stockState from 'state/stockState';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { InfoTable, QuoteTable } from 'components/Overview/TopTablesETF';
import PriceChart from 'components/PriceChart/_PriceChart';
import Profile from 'components/Overview/ProfileWidget';
import NewsArea from 'components/Overview/NewsArea';
import HoldingsWidget from 'components/Overview/HoldingsWidget';
import DividendWidget from 'components/Overview/DividendWidget';

const EtfOverview = ({ info, data, news }) => {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock info={info}>
			<SEO
				title={`${info.ticker} ETF Stock Price, Quote & Overview`}
				description={`Get a real-time stock price quote for ${info.ticker} (${info.name}). Also includes news, ETF details and other investing information.`}
				canonical={`etf/${info.symbol}/`}
			/>
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
				<div className="px-4 md:px-0 lg:order-2 space-y-7">
					<Profile />
					<HoldingsWidget ticker={info.ticker} data={data.holdingsTable} />
					<DividendWidget ticker={info.ticker} data={data.dividendTable} />
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
	const { info, data, news } = await getPageData('overview', params.symbol);

	return {
		props: {
			info,
			data,
			news,
		},
		revalidate: 600,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
